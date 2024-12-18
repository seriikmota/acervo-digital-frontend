import {inject, Injectable} from '@angular/core';
import {AbstractService} from "../shared/abstract.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {ItemRoles} from "./item-routing.module";

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

    if (this.securityService.hasRoles(ItemRoles.LIST_ALL)) {
      let headers = this.createHeaders();
      return this.httpService.get<any[]>(`${this.url}`, {
        params: params,
        headers: headers,
      }).pipe(
        catchError(this.handleError)
      );
    } else {
      return this.httpService.get<any[]>(`${this.url}/list`, {
        params: params
      }).pipe(
        catchError(this.handleError)
      );
    }
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
    console.log(this.createHeaders())
    return this.httpService.post(`${this.url}`, formData, {
      headers: this.createHeaders()
    })
      .pipe(
        catchError(this.handleError)
      );
  }

}
