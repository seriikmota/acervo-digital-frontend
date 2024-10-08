import { lastValueFrom, Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as myGlobals from './globals';

export abstract class AbstractService<T> {
  protected url: string;

  protected constructor(protected httpService: HttpClient, baseUrl: string) {
    this.url = `${myGlobals.API_URL}/${baseUrl}`;
  }

  listar(filtroObjeto: any, pageNumber: number, pageSize: number): Observable<any[]> {
    filtroObjeto.pageNumber = pageNumber;
    filtroObjeto.pageSize = pageSize;

    return this.httpService.get<any[]>(this.url,{
      headers: this.createHeaders()
    })
      .pipe(
        catchError(this.handleError)
      );
  }


  consultarPorId(id:number): Observable<any[]> {
    return this.httpService.get<any[]>(`${this.url}/${id}`,{
      headers: this.createHeaders()
    })
      .pipe(
        catchError(this.handleError)
      );
  }

  update(dado: any, id: number): Observable<T> {
    return this.httpService.put<T>(`${this.url}/${id}`, dado, {
      headers: this.createHeaders()
    })
      .pipe(
        catchError(this.handleError)
      );
  }

  save(dado: any): Observable<any> {
    console.log(this.createHeaders())
    return this.httpService.post<any>(`${this.url}`, dado, {
      headers: this.createHeaders()
    })
      .pipe(
        catchError(this.handleError)
      );
  }

  filter(dado: string): Observable<any> {
    return this.httpService.get<any>(`${this.url}/search/${dado}`, {
      headers: this.createHeaders()
    })
      .pipe(
        catchError(this.handleError)
      );
  }

  excluir(id: number): Observable<void> {
    return this.httpService.delete<void>(`${this.url}/${id}`, {
      headers: this.createHeaders()
    })
      .pipe(
        catchError(this.handleError)
      );
  }

  exportar(dado: any): Observable<any> {
    return this.httpService.post<any>(`${this.url}/exportar`, dado, {
      headers: this.createHeaders()
    })
      .pipe(
        catchError(this.handleError)
      );
  }

  protected handleError(error: any): Observable<never> {
    return throwError(() => new Error(error.error));
  }

  private createHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  private getToken(): string | null {
    return localStorage.getItem('userToken');
  }

  enviarArquivo(arquivo: File): Observable<any> {
    const reader = new FileReader();

    return new Observable(observer => {
      reader.onload = () => {
        const fileContent = reader.result;
        const formData = new FormData();
        formData.append('file', new Blob([fileContent as string]), arquivo.name);

        this.httpService.post<any>(`${this.url}/upload`, formData, {
          headers: this.createHeaders()
        }).subscribe({
          next: (response) => observer.next(response),
          error: (error) => observer.error(this.handleError(error)),
          complete: () => observer.complete()
        });
      };

      reader.onerror = (error) => {
        observer.error(error);
      };

      reader.readAsArrayBuffer(arquivo);
    });
  }
}
