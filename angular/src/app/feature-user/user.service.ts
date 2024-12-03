import { Injectable } from '@angular/core';
import {AbstractService} from "../shared/abstract.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractService<any>{

  protected constructor(httpService: HttpClient) {
    super(httpService,'user');
  }

  listarLogs(filtroObjeto: any, pageNumber: number, pageSize: number, sortData: any): Observable<any[]> {
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

    return this.httpService.get<any[]>(`${this.url}/getLogUsers`,{
      headers: this.createHeaders(),
      params: params
    }).pipe(
        catchError(this.handleError)
    );
  }
}
