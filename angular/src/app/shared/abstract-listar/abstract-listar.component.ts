import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AbstractService} from "../abstract.service";
import {MatTableDataSource} from "@angular/material/table";
import * as tableGlobals from './globals-table'
import {MatPaginator} from "@angular/material/paginator";
@Component({
  selector: 'app-abstract-listar',
  templateUrl: './abstract-listar.component.html',
  styleUrls: ['./abstract-listar.component.scss']
})
export class AbstractListarComponent<T> implements OnInit,AfterViewInit {
  displayedColumns: string[] = tableGlobals.displayedColumns;
  dataSource = new MatTableDataSource<T>();
  filtroObjeto: any = {};
  pageNumber: number = 0;
  pageSize: number = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: AbstractService<T>) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.listarDados();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  listarDados(): void {
    this.service.listar(this.filtroObjeto, this.pageNumber, this.pageSize).subscribe({
      next: (data) => this.dataSource.data = data,
      error: (error) => console.error('Erro ao listar dados:', error)
    });
  }

  editar(element: T): void {
    // Lógica para edição
  }

  excluir(element: any): void {
      this.service.excluir(element.id).subscribe({
        next: () => {
          console.log('Item excluído com sucesso!');
        },
        error: (error) => console.error('Erro ao excluir item:', error)
      });
  }


  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex;
    this.listarDados();
  }
}
