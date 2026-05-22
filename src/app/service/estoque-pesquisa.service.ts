import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface EstoqueFiltro {
  lojaId?: number;
  nomeProduto?: string;
  nomeLoja?: string;
  semEstoque?: boolean;

  page?: number;
  size?: number;
}
@Injectable({
  providedIn: 'root'
})
export class EstoquePesquisaService {

  private api =
    `${environment.apiUrl}/estoque/relatorio`;

  constructor(private http: HttpClient) {}

  pesquisar(
    filtro: EstoqueFiltro,
    page = 0,
    size = 20
  ): Observable<any> {

    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (filtro.lojaId) {
      params = params.set(
        'lojaId',
        filtro.lojaId
      );
    }

    if (filtro.nomeLoja) {
      params = params.set(
        'nomeLoja',
        filtro.nomeLoja
      );
    }

    if (filtro.nomeProduto) {
      params = params.set(
        'nomeProduto',
        filtro.nomeProduto
      );
    }

    if (filtro.semEstoque !== undefined) {
      params = params.set(
        'semEstoque',
        filtro.semEstoque
      );
    }

    return this.http.get(this.api, {
      params
    });
  }
}