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

  activeCategory = '';

  toastMessage:
    string | null = null;

  toastTimeout: any;

  search = '';

  previewProdutos:
    any[] = [];

  mostrarDropdown =
    false;

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
  }

  ngOnInit() {
    this.initIcons();
  }

  ngAfterViewChecked() {
    this.initIcons();
  }

  initIcons() {

    if (
      typeof lucide
      !== 'undefined'
    ) {

      lucide.createIcons();
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

  
}