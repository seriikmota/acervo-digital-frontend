import { Injectable } from '@angular/core';
import { lastValueFrom, Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as myGlobals from './globals';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractService<T> {

  protected constructor(protected httpService: HttpClient) {}

  async asyncListar(filtroObjeto: any, pageNumber: number, pageSize: number): Promise<T[]> {
    filtroObjeto.pageNumber = pageNumber;
    filtroObjeto.pageSize = pageSize;
    try {
      return await lastValueFrom(this.httpService.post<T[]>(`${myGlobals.API_URL}/listar`, filtroObjeto));
    } catch (error) {
      return Promise.reject(this.handleError(error));
    }
  }

  listar(filtroObjeto: any, pageNumber: number, pageSize: number): Observable<T[]> {
    filtroObjeto.pageNumber = pageNumber;
    filtroObjeto.pageSize = pageSize;
    return this.httpService.post<T[]>(`${myGlobals.API_URL}/listar`, filtroObjeto)
      .pipe(
        catchError(this.handleError)
      );
  }

  consultarPorId(id: number): Observable<T> {
    return this.httpService.get<T>(`${myGlobals.API_URL}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  incluir(registro: T): Observable<T> {
    return this.httpService.post<T>(`${myGlobals.API_URL}`, registro)
      .pipe(
        catchError(this.handleError)
      );
  }

  excluir(id: number): Observable<void> {
    return this.httpService.delete<void>(`${myGlobals.API_URL}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  protected handleError(error: any): Observable<never> {
    // Aqui você pode implementar um tratamento de erro mais detalhado, como logging
    console.error('Ocorreu um erro:', error);
    return throwError(() => new Error('Ocorreu um erro, por favor tente novamente.'));
  }
}
