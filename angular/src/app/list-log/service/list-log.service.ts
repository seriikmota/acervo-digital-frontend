import { Injectable } from '@angular/core';
import { AbstractService } from '../../shared/abstract.service';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import * as myGlobals from "../../shared/globals";

@Injectable({
  providedIn: 'root'
})
export class ListLogService extends AbstractService<any> {

  protected constructor(httpService: HttpClient) {
    super(httpService, 'log');
  }

  override listar(filtroObjeto: any, pageNumber: number, pageSize: number): Observable<any[]> {
    filtroObjeto.pageNumber = pageNumber;
    filtroObjeto.pageSize = pageSize;

    const url = `${myGlobals.API_URL}/user/getLogUsers`;

    console.log(url);

    return this.httpService.get<any[]>(url, {
      headers: this.createHeaders()
    })
      .pipe(
        catchError(this.handleError)
      );
  }
}
