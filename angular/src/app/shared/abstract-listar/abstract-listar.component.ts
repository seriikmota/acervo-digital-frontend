import {AfterViewInit, Component, Directive, Inject, OnInit, ViewChild} from '@angular/core';
import {AbstractService} from "../abstract.service";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import * as tableGlobals from './globals-table'
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {DialogMessageOkComponent} from "../../core/dialog-message-ok/dialog-message-ok.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NgForOf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
@Component({
  selector: 'app-abstract-listar',
  templateUrl: './abstract-listar.component.html',
  standalone: true,
  imports: [
    NgForOf,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule
  ],
  styleUrls: ['./abstract-listar.component.scss']
})
export class AbstractListarComponent<T> implements OnInit,AfterViewInit {
  displayedColumns: string[] = tableGlobals.displayedColumns;
  dataSource = new MatTableDataSource<any>();
  filtroObjeto: any = {};
  pageNumber: number = 0;
  pageSize: number = 10;
  private dialogRef!: MatDialogRef<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: AbstractService<any>,@Inject(MAT_DIALOG_DATA) public data: any,   private dialog: MatDialog, private dialogRefCurrent: MatDialogRef<any>) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.listarDados();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  listarDados(): void {
    this.service.listar(this.filtroObjeto, this.pageNumber, this.pageSize).subscribe({
      next: (data) => {
        this.dataSource.data = data
      },
      error: (error) =>   this.showMessage("Erro ao listar:\n" + error.error)
    });
  }

  editar(element: T): void {
  }

  excluir(element: any): void {
      this.service.excluir(element.id).subscribe({
        next: () => {
          this.showMessage("Item excluido com sucesso!");
        },
        error: (error) =>  this.showMessage("Erro ao excluir:\n" + error.error)
      });
  }


  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex;
    this.listarDados();
  }
  private showMessage(message: string) {
    this.dialogRef = this.dialog.open(DialogMessageOkComponent, {
      minWidth: "200px",
      minHeight: "100px",
      disableClose: true,
      data: message
    });
    this.dialogRef.afterClosed().subscribe(value => {
      this.dialogRefCurrent.close();
    });
  }

}
