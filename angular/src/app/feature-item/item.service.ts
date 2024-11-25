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

  override listar(filtroObjeto: any, pageNumber: number, pageSize: number, sortData: any): Observable<any[]> {
    let params;
    if (sortData) {
      params = new HttpParams()
        .set('page', pageNumber)
        .set('size', pageSize)
        .set('sort', `${sortData.sortParam},${sortData.sortDirection}`)
    } else {
      params = new HttpParams()
        .set('page', pageNumber)
        .set('size', pageSize)
    }

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

  override save(formData: FormData): Observable<any> {
    console.log("sexo")
    return this.httpService.post<any>(`${this.url}`, formData, {
      headers: this.createHeaders()
    })
      .pipe(
        catchError(this.handleError)
      );
  }

}
