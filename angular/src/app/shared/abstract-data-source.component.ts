import { Component, EventEmitter } from '@angular/core';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { AbstractService } from './abstract.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-abstract-data-source',
  templateUrl: './abstract-data-source.component.html',
  styleUrls: ['./abstract-data-source.component.scss']
})
export class AbstractDataSourceComponent<T> implements DataSource<T> {
  public abstractSubject = new BehaviorSubject<T[]>([]);
  public eventEmitterProcessarLista: EventEmitter<any>;
  public paginaAtual: 0 | undefined;
  public totalRegistros: 0 | undefined;

  constructor(
    private abstractService: AbstractService<T>,
    public httpService: HttpClient,
    private snackBar: MatSnackBar,
    eventEmitterProcessarLista: EventEmitter<any>
  ) {
    this.eventEmitterProcessarLista = eventEmitterProcessarLista;
  }

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    return this.abstractSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.abstractSubject.complete();
  }

  listar(
    filtroObjeto: any,
    pageIndex: number,
    pageSize: number,
    eventEmitterFilterQueryFinished?: EventEmitter<any>
  ): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.abstractService.listar(filtroObjeto, pageIndex, pageSize).subscribe({
        next: (data: any) => {
          if (data.status === 'SUCCESS') {
            this.processarLista(data);
          } else {
            this.handleError(data);
          }
          resolve(true);
        },
        error: (error) => {
          console.log('Erro ao listar os registros:', error);
          resolve(false);
        },
        complete: () => {
          if (eventEmitterFilterQueryFinished) {
            eventEmitterFilterQueryFinished.emit();
          }
        }
      });
    });
  }

  private processarLista(data: any): void {
    this.abstractSubject.next(data.result);
    this.totalRegistros = data.totalRegistros;
    this.paginaAtual = data.paginaAtual;
    if (this.eventEmitterProcessarLista) {
      this.eventEmitterProcessarLista.emit(data.result);
    }
  }

  private handleError(data: any): void {
    if (data.status === 'INFO') {
      this.snackBar.open('Nenhum resultado encontrado', '', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } else {
      this.snackBar.open('Erro ao carregar tabela. Verifique sua conexão com a internet.', '', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
    this.abstractSubject.next([]);
    this.totalRegistros = 0;
    this.paginaAtual = 0;
  }
}
