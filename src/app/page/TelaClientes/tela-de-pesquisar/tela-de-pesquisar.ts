import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  ActivatedRoute
} from '@angular/router';

import {
  HttpClient
} from '@angular/common/http';

import {
  EstoquePesquisaService
} from '../../../service/estoque-pesquisa.service';

import {
  Navbar
} from '../../../shared/navbar/navbar';

@Component({
  selector: 'app-tela-de-pesquisar',
  standalone: true,
  imports: [
    CommonModule,
    Navbar,
    FormsModule
  ],
  templateUrl:
    './tela-de-pesquisar.html',
  styleUrl:
    './tela-de-pesquisar.css'
})
export class TelaDePesquisar
implements OnInit {

  produtos: any[] = [];

  lojas: any[] = [];

  loading = false;

paginaAtual = 0;
totalPaginas = 0;

filtro = {
  lojaId: undefined as number | undefined,
  nomeProduto: '',
  nomeLoja: '',
  semEstoque: false
};

  constructor(
    private route:
      ActivatedRoute,

    private http:
      HttpClient,

    private estoqueService:
      EstoquePesquisaService
  ) {}

  ngOnInit() {

    this.carregarLojas();

    this.route.queryParams
      .subscribe(params => {

      this.filtro.nomeProduto =
        params['nomeProduto']
        || '';

      this.buscar();
    });
  }

getImagem(item: any): string {

  if (!item.imagemBase64) {
    return 'assets/sem-imagem.png';
  }

  if (
    item.imagemBase64
    .startsWith('data:image')
  ) {
    return item.imagemBase64;
  }

  return `data:image/png;base64,${item.imagemBase64}`;
}

  carregarLojas() {

    this.http
      .get<any[]>(
        'http://localhost:8080/loja-bairros/lojas-com-bairros'
      )
      .subscribe(res => {

        this.lojas = res;
      });
  }

  

buscar(pagina: number = 0) {

  this.loading = true;

  this.paginaAtual = pagina;

  this.estoqueService
    .pesquisar({
      ...this.filtro,
      page: pagina,
      size: 12
    })
    .subscribe({

      next: (response) => {

        this.produtos =
          response.content;

        this.totalPaginas =
          response.totalPages;

        this.loading = false;
      },

      error: err => {

        console.error(err);

        this.loading = false;
      }
    });
}
}