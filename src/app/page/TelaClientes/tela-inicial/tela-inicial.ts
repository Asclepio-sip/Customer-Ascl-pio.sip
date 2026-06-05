import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstoqueService, Estoque } from '../../../service/estoque.service';
import { CartService } from '../../../service/cart.service';
import { Navbar } from '../../../shared/navbar/navbar';

declare const lucide: any;

@Component({
  selector: 'app-tela-inicial',
  standalone: true,
  imports: [CommonModule, Navbar],
  templateUrl: './tela-inicial.html',
  styleUrl: './tela-inicial.css',
})
export class TelaInicial implements OnInit, AfterViewChecked {

  @ViewChild('produtosTrack') produtosTrack!: ElementRef<HTMLDivElement>;
  @ViewChild('higieneTrack') higieneTrack!: ElementRef<HTMLDivElement>;

  produtos: Estoque[] = [];

  constructor(
    private estoqueService: EstoqueService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.estoqueService.listar().subscribe({
      next: (res) => {
        this.produtos = res.content;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Erro ao carregar estoque", err);
      }
    });
  }

  private iconsInit = false;

  ngAfterViewChecked() {
    if (typeof lucide !== 'undefined' && !this.iconsInit) {
      lucide.createIcons();
      this.iconsInit = true;
    }
  }

  adicionar(produto: Estoque, event: MouseEvent) {
    this.cartService.add(produto);
    this.flyToCart(event, produto);
  }

  private flyToCart(event: MouseEvent, produto: Estoque) {
    const btn = event.currentTarget as HTMLElement;
    const cartIcon = document.querySelector('.action-item.cart');
    if (!cartIcon) return;

    const btnRect = btn.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    // Destination: exactly at top edge of the cart icon, centered horizontally
    const destX = cartRect.left + cartRect.width / 2;
    const destY = cartRect.top;

    // Create flying element
    const flyer = document.createElement('div');

    // Use product image if available
    const img = btn.closest('.product-card, .offer-card, .hygiene-card')?.querySelector('img');
    if (img) {
      const imgClone = img.cloneNode(true) as HTMLImageElement;
      imgClone.style.width = '100%';
      imgClone.style.height = '100%';
      imgClone.style.objectFit = 'cover';
      imgClone.style.borderRadius = '50%';
      flyer.appendChild(imgClone);
    } else {
      flyer.style.background = 'var(--primary)';
    }

    const startSize = 80;
    const startX = btnRect.left + btnRect.width / 2 - startSize / 2;
    const startY = btnRect.top + btnRect.height / 2 - startSize / 2;

    // Start at button — fully circular
    flyer.style.cssText = `
      position: fixed;
      z-index: 99999;
      width: ${startSize}px;
      height: ${startSize}px;
      border-radius: 50%;
      overflow: hidden;
      pointer-events: none;
      box-shadow: 0 8px 32px rgba(0,0,0,0.4);
      border: 3px solid var(--primary);
      left: ${startX}px;
      top: ${startY}px;
      opacity: 1;
      transform: scale(1);
    `;

    document.body.appendChild(flyer);

    // Phase 1: pop (pause 400ms so user sees the product)
    flyer.style.transition = 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1.4)';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        flyer.style.transform = 'scale(1.1)';
      });
    });

    // Phase 2: fly to EXACTLY the top of the cart icon — stop there, never pass it
    const endSize = 36;
    setTimeout(() => {
      flyer.style.transition = 'all 0.85s cubic-bezier(0.4, 0, 0.2, 1)';
      requestAnimationFrame(() => {
        flyer.style.left = `${destX - endSize / 2}px`;
        flyer.style.top = `${destY - endSize / 2}px`;
        flyer.style.width = `${endSize}px`;
        flyer.style.height = `${endSize}px`;
        flyer.style.transform = 'scale(1)';
      });
    }, 400);

    // Phase 3: burst at the top of the cart
    setTimeout(() => {
      flyer.style.transition = 'all 0.15s ease-out';
      requestAnimationFrame(() => {
        flyer.style.transform = 'scale(2)';
        flyer.style.opacity = '0';
      });

      // Particles burst at the cart top
      this.createBurst(destX, destY);

      // Shake cart after burst
      setTimeout(() => {
        cartIcon.classList.add('cart-shake');
        setTimeout(() => cartIcon.classList.remove('cart-shake'), 600);
      }, 80);
    }, 1280);

    setTimeout(() => flyer.remove(), 1500);
  }

  private createBurst(cx: number, cy: number) {
    const colors = ['var(--primary)', '#ff6b6b', '#ffa94d', '#e31918'];
    for (let i = 0; i < 8; i++) {
      const dot = document.createElement('div');
      const angle = (i / 8) * Math.PI * 2;
      const dist = 28 + Math.random() * 16;

      dot.style.cssText = `
        position: fixed;
        z-index: 99998;
        pointer-events: none;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: ${colors[i % colors.length]};
        left: ${cx - 4}px;
        top: ${cy - 4}px;
        opacity: 1;
        transition: all 0.45s cubic-bezier(0, 0.8, 0.2, 1);
      `;
      document.body.appendChild(dot);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          dot.style.left = `${cx + Math.cos(angle) * dist - 4}px`;
          dot.style.top = `${cy + Math.sin(angle) * dist - 4}px`;
          dot.style.opacity = '0';
          dot.style.transform = 'scale(0.2)';
        });
      });

      setTimeout(() => dot.remove(), 500);
    }
  }

  getImagem(p: Estoque): string {
    return p.imagemBase64
      ? 'data:image/png;base64,' + p.imagemBase64
      : 'assets/sem-imagem.png';
  }

  scrollProdutos(amount: number) {
    this.produtosTrack?.nativeElement.scrollBy({ left: amount, behavior: 'smooth' });
  }

  scrollHigiene(amount: number) {
    this.higieneTrack?.nativeElement.scrollBy({ left: amount, behavior: 'smooth' });
  }
}
