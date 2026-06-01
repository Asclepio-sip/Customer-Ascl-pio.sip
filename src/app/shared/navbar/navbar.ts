import {
  Component,
  OnInit,
  AfterViewChecked
} from '@angular/core';

import {
  Router,
  RouterModule
} from '@angular/router';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  AuthService
} from '../../service/auth.service';

import {
  ProductService
} from '../../service/product.service';

import {
  CartService
} from '../../service/cart.service';

import { Cart }
from '../cart/cart';

declare const lucide: any;

@Component({
  selector: 'app-navbar',
  standalone: true,

  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    Cart
  ],

  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar
implements OnInit, AfterViewChecked {

  showLogoutModal = false;
  closing = false;
  showMenu = false;
  showCart = false;
  badgeBump = false;

  activeCategory = '';

  toastMessage:
    string | null = null;

  toastTimeout: any;

  search = '';

  previewProdutos:
    any[] = [];

  mostrarDropdown =
    false;

  isDarkMode = false;

  constructor(
    public authService:
      AuthService,

    private productService:
      ProductService,

    public cartService:
      CartService,

    private router:
      Router
  ) {

    this.cartService
      .cartError$
      .subscribe(msg => {

      this.toastMessage =
        null;

      if (!msg) return;

      this.toastMessage =
        msg;

      clearTimeout(
        this.toastTimeout
      );

      this.toastTimeout =
        setTimeout(() => {

        this.toastMessage =
          null;

      }, 4000);
    });

    this.cartService.cartBump$.subscribe(() => {
      this.badgeBump = false;
      setTimeout(() => this.badgeBump = true, 10);
      setTimeout(() => this.badgeBump = false, 600);
    });
  }

  ngOnInit() {
    this.initIcons();
    const saved = localStorage.getItem('promofarma-theme');
    this.isDarkMode = saved === 'dark';
    this.applyTheme();
  }

  ngAfterViewChecked() {
    this.initIcons();
  }

  private iconsInitialized = false;

  initIcons() {
    if (typeof lucide !== 'undefined' && !this.iconsInitialized) {
      lucide.createIcons();
      this.iconsInitialized = true;
    }
  }

  refreshIcons() {
    if (typeof lucide !== 'undefined') {
      setTimeout(() => lucide.createIcons(), 0);
    }
  }

  

  buscarPreview() {

    if (
      this.search
      .trim()
      .length < 3
    ) {

      this.previewProdutos =
        [];

      this.mostrarDropdown =
        false;

      return;
    }

    this.productService
      .buscarPreview(
        this.search
      )
      .subscribe({

      next: (
        res: any
      ) => {

        this.previewProdutos =
          res.content
            ?.slice(0, 5)
          || [];

        this.mostrarDropdown =
          true;
      },

      error: err => {
        console.error(err);
      }
    });
  }

  selecionarProduto(
    item: any
  ) {

    this.search =
      item.nomeProduto;

    this.irParaPesquisa();
  }

  irParaPesquisa() {

    if (
      !this.search.trim()
    ) {
      return;
    }

    this.mostrarDropdown =
      false;

    this.router.navigate(
      ['/pesquisa'],
      {
        queryParams: {
          nomeProduto:
            this.search
        }
      }
    );
  }

  fecharToast() {

    this.toastMessage =
      null;

    clearTimeout(
      this.toastTimeout
    );
  }

  setActive(
    category: string
  ) {

    this.activeCategory =
      category;
  }

  toggleMenu() {

    this.showMenu =
      !this.showMenu;

    setTimeout(() => {

      this.initIcons();

    }, 50);
  }

  abrirLogout() {
    this.showLogoutModal =
      true;
  }

  cancelarLogout() {

    this.closing =
      true;

    setTimeout(() => {

      this.showLogoutModal =
        false;

      this.closing =
        false;

    }, 250);
  }

  confirmarLogout() {

    this.closing =
      true;

    setTimeout(() => {

      this.authService
        .logout();

      location.href = '/';

    }, 250);
  }

  abrirCarrinho() {
    this.showCart = true;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('promofarma-theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
    this.refreshIcons();
  }

  private applyTheme() {
    document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
  }

  
}