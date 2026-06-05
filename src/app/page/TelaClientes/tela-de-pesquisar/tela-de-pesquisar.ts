import {
  Component,
  OnInit,
  AfterViewChecked,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  ActivatedRoute,
  RouterModule
} from '@angular/router';

import {
  HttpClient
} from '@angular/common/http';

import {
  EstoquePesquisaService
} from '../../../service/estoque-pesquisa.service';

import {
  CartService
} from '../../../service/cart.service';

import {
  Navbar
} from '../../../shared/navbar/navbar';

declare const lucide: any;

@Component({
  selector: 'app-tela-de-pesquisar',
  standalone: true,
  imports: [
    CommonModule,
    Navbar,
    FormsModule,
    RouterModule
  ],
  templateUrl:
    './tela-de-pesquisar.html',
  styleUrl:
    './tela-de-pesquisar.css'
})
export class TelaDePesquisar
implements OnInit, AfterViewChecked {

  produtos: any[] = [];
  lojas: any[] = [];
  loading = false;
  paginaAtual = 0;
  totalPaginas = 0;

  ordenacao = 'relevancia';
  filtroLoja: number | undefined;
  buscaLocal = '';
  produtosFiltrados: any[] = [];

  filtro = {
    lojaId: undefined as number | undefined,
    nomeProduto: '',
    nomeLoja: '',
    semEstoque: false
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private estoqueService: EstoquePesquisaService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {}

  private iconsInit = false;

  ngOnInit() {
    this.carregarLojas();

    this.route.queryParams
      .subscribe(params => {
        this.filtro.nomeProduto = params['nomeProduto'] || '';
        this.buscar();
      });
  }

  ngAfterViewChecked() {
    if (typeof lucide !== 'undefined' && !this.iconsInit) {
      lucide.createIcons();
      this.iconsInit = true;
    }
  }

getImagem(item: any): string {
  if (!item.imagemBase64) {
    return 'assets/sem-imagem.png';
  }
  if (item.imagemBase64.startsWith('data:image')) {
    return item.imagemBase64;
  }
  return `data:image/png;base64,${item.imagemBase64}`;
}

  carregarLojas() {
    this.http
      .get<any[]>('http://localhost:8080/loja-bairros/lojas-com-bairros')
      .subscribe(res => {
        this.lojas = res;
        this.cdr.detectChanges();
      });
  }

  buscar(pagina: number = 0) {
    this.loading = true;
    this.paginaAtual = pagina;

    this.estoqueService
      .pesquisar({
        ...this.filtro,
        lojaId: this.filtroLoja,
        page: pagina,
        size: 12
      })
      .subscribe({
        next: (response) => {
          this.produtos = response.content;
          this.totalPaginas = response.totalPages;
          this.loading = false;
          this.ordenar();
          this.filtrarLocal();
          this.cdr.detectChanges();
        },
        error: err => {
          console.error(err);
          this.loading = false;
        }
      });
  }

  ordenar() {
    switch (this.ordenacao) {
      case 'menor':
        this.produtos.sort((a, b) => (a.valorFinal || a.preco) - (b.valorFinal || b.preco));
        break;
      case 'maior':
        this.produtos.sort((a, b) => (b.valorFinal || b.preco) - (a.valorFinal || a.preco));
        break;
      case 'nome':
        this.produtos.sort((a, b) => a.nomeProduto.localeCompare(b.nomeProduto));
        break;
    }
    this.filtrarLocal();
  }

  filtrarLocal() {
    if (!this.buscaLocal.trim()) {
      this.produtosFiltrados = [...this.produtos];
      return;
    }
    const termo = this.buscaLocal.toLowerCase().trim();
    this.produtosFiltrados = this.produtos.filter(p =>
      p.nomeProduto?.toLowerCase().includes(termo) ||
      p.nomeLoja?.toLowerCase().includes(termo)
    );
  }

  limparBuscaLocal() {
    this.buscaLocal = '';
    this.filtrarLocal();
  }

  filtrarPorLoja(lojaId: number | undefined) {
    this.filtroLoja = lojaId;
    this.buscar(0);
  }

  aplicarFiltros() {
    this.buscar(0);
  }

  limparFiltros() {
    this.filtroLoja = undefined;
    this.ordenacao = 'relevancia';
    this.buscaLocal = '';
    this.filtro.nomeProduto = '';
    this.filtro.nomeLoja = '';
    this.filtro.semEstoque = false;
    this.buscar(0);
  }

  getPaginas(): number[] {
    const pages: number[] = [];
    const total = this.totalPaginas;
    const current = this.paginaAtual;

    if (total <= 5) {
      for (let i = 0; i < total; i++) pages.push(i);
      return pages;
    }

    pages.push(0);
    if (current > 2) pages.push(-1); // dots

    const start = Math.max(1, current - 1);
    const end = Math.min(total - 2, current + 1);
    for (let i = start; i <= end; i++) pages.push(i);

    if (current < total - 3) pages.push(-1); // dots
    pages.push(total - 1);

    return pages;
  }

  adicionar(item: any, event: MouseEvent) {
    this.cartService.add(item);
    this.flyToCart(event, item);
  }

  private flyToCart(event: MouseEvent, item: any) {
    const btn = event.currentTarget as HTMLElement;
    const cartIcon = document.querySelector('.action-item.cart');
    if (!cartIcon) return;

    const btnRect = btn.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();
    const destX = cartRect.left + cartRect.width / 2;
    const destY = cartRect.top;

    const flyer = document.createElement('div');
    const img = btn.closest('.product-card')?.querySelector('img');
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
    flyer.style.cssText = `
      position: fixed; z-index: 99999;
      width: ${startSize}px; height: ${startSize}px;
      border-radius: 50%; overflow: hidden; pointer-events: none;
      box-shadow: 0 8px 32px rgba(0,0,0,0.4);
      border: 3px solid var(--primary);
      left: ${btnRect.left + btnRect.width / 2 - startSize / 2}px;
      top: ${btnRect.top + btnRect.height / 2 - startSize / 2}px;
      opacity: 1; transform: scale(1);
    `;
    document.body.appendChild(flyer);

    flyer.style.transition = 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1.4)';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      flyer.style.transform = 'scale(1.1)';
    }));

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

    setTimeout(() => {
      flyer.style.transition = 'all 0.15s ease-out';
      requestAnimationFrame(() => {
        flyer.style.transform = 'scale(2)';
        flyer.style.opacity = '0';
      });
      this.createBurst(destX, destY);
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
        position: fixed; z-index: 99998; pointer-events: none;
        width: 8px; height: 8px; border-radius: 50%;
        background: ${colors[i % colors.length]};
        left: ${cx - 4}px; top: ${cy - 4}px;
        opacity: 1; transition: all 0.45s cubic-bezier(0, 0.8, 0.2, 1);
      `;
      document.body.appendChild(dot);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        dot.style.left = `${cx + Math.cos(angle) * dist - 4}px`;
        dot.style.top = `${cy + Math.sin(angle) * dist - 4}px`;
        dot.style.opacity = '0';
        dot.style.transform = 'scale(0.2)';
      }));
      setTimeout(() => dot.remove(), 500);
    }
  }
}