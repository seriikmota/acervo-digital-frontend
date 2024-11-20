import { Injectable } from '@angular/core';
import {AbstractService} from "../shared/abstract.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ItemService extends AbstractService<any>{

  protected constructor(httpService: HttpClient) {
    super(httpService,'item');
  }

  override listar(filtroObjeto: any, pageNumber: number, pageSize: number): Observable<any[]> {
    filtroObjeto.pageNumber = pageNumber;
    filtroObjeto.pageSize = pageSize;

    let params = new HttpParams()
      .set('page', pageNumber.toString())
      .set('size', pageSize.toString())
      .set('sort', 'id,asc');

    return this.httpService.get<any[]>(`${this.url}/list`, {
      params: params,
    }).pipe(
        catchError(this.handleError)
    );
  }

  override exportarPdf(id: any): Observable<any> {
    let params = new HttpParams()
      .set('id', id);

    return this.httpService.get<any>(`${this.url}/pdf`, {
      params: params,
      responseType: 'arraybuffer' as 'json',
    }).pipe(
        catchError(this.handleError)
    );
  }
}
