import { Injectable } from '@angular/core';
import {AbstractService} from "../shared/abstract.service";
import { HttpClient } from "@angular/common/http";
import {catchError, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractService<any>{

  protected constructor(httpService: HttpClient) {
    super(httpService,'user');
  }

  listarLogs(filtroObjeto: any, pageNumber: number, pageSize: number): Observable<any[]> {
    filtroObjeto.pageNumber = pageNumber;
    filtroObjeto.pageSize = pageSize;

    return this.httpService.get<any[]>(`${this.url}/getLogUsers`,{
      headers: this.createHeaders()
    }).pipe(
        catchError(this.handleError)
    );
  }
}
