import {AfterViewInit, Component, Directive, Inject, OnInit, ViewChild} from '@angular/core';
import {AbstractService} from "../abstract.service";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {DialogMessageOkComponent} from "../../core/dialog-message-ok/dialog-message-ok.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";


@Directive()
export abstract class AbstractListarComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = [];
  columnNamesMapping: { [key: string]: string };
  dataSource = new MatTableDataSource<any>();
  filtroObjeto: any = {};
  pageNumber: number = 0;
  pageSize: number = 10;
  public dialogRef!: MatDialogRef<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public constructor(public service: AbstractService<any>,@Inject(MAT_DIALOG_DATA) public data: any,   public dialog: MatDialog, public dialogRefCurrent: MatDialogRef<any>) {
    this.columnNamesMapping = this.getColumnNamesMapping();
  }

  ngOnInit(): void {
    this.listarDados();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

  }

  protected abstract getColumnNamesMapping(): { [key: string]: string };
  listarDados(): void {
    this.service.listar(this.filtroObjeto, this.pageNumber, this.pageSize).subscribe({
      next: (data) => {
        this.dataSource.data = data
      },
      error: (error) =>   this.showMessage("Erro ao listar:\n" + error.error)
    });
  }

  abstract getEditComponent(): any;

  editar(element: any): void {
    const dialogRef = this.dialog.open(this.getEditComponent(), {
      width: '80%',
      maxWidth: '600px',
      height: 'auto',
      maxHeight: '90vh',
      data: element,
    });

    dialogRef.afterClosed().subscribe((result) => {
        this.listarDados();
    });
  }

  incluir(): void {
    const dialogRef = this.dialog.open(this.getEditComponent(), {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result) => {
        this.listarDados();
    });
  }

  excluir(element: any): void {
      this.service.excluir(element.id).subscribe({
        next: () => {
          this.showMessage("Item excluido com sucesso!");
          this.listarDados()
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
      data: message,
    });
    this.dialogRef.afterClosed().subscribe(value => {
      this.dialogRefCurrent.close();
      this.listarDados()
    });
  }


}
