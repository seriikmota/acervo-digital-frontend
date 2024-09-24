import { lastValueFrom, Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as myGlobals from './globals';

export abstract class AbstractService<T> {
  protected url: string;

  protected constructor(protected httpService: HttpClient, baseUrl: string) {
    this.url = `${myGlobals.API_URL}/${baseUrl}`;
  }

  listar(filtroObjeto: any, pageNumber: number, pageSize: number): Observable<any[]> {
    filtroObjeto.pageNumber = pageNumber;
    filtroObjeto.pageSize = pageSize;

    return this.httpService.get<any[]>(this.url)
      .pipe(
        catchError(this.handleError)
      );
  }

  update(dado: any, id: number): Observable<T> {
    return this.httpService.put<T>(`${this.url}/${id}`, dado)
      .pipe(
        catchError(this.handleError)
      );
  }

  save(dado: any): Observable<any> {
    return this.httpService.post<any>(`${this.url}`, dado)
      .pipe(
        catchError(this.handleError)
      );
  }

  excluir(id: number): Observable<void> {
    return this.httpService.delete<void>(`${this.url}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  protected handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError(() => new Error('Ocorreu um erro, por favor tente novamente.'));
  }
}
