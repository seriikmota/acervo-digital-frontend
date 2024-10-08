import {AfterViewInit, Directive, Inject, OnInit, ViewChild} from '@angular/core';
import {AbstractService} from "../abstract.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
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
  filtro: string = '';


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
    });
  }

  abstract getEditComponent(): any;

  abstract getnameComponent(): any;

  editar(element: any): void {
    const dialogRef = this.dialog.open(this.getEditComponent(), {
      maxWidth: 'auto',
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
      maxWidth: 'auto',
      height: 'auto',
      maxHeight: '90vh',
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
  exportar(): void {
    this.service.exportar(this.filtroObjeto).subscribe({
      next: (data) => {
        let blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        let url = window.URL.createObjectURL(blob);
        window.open(url);
      },
    });
  }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex;
    this.listarDados();
  }
  applyFilter() {
    this.service.filter(this.filtro).subscribe({
      next: (data) => {
        if (data!=null && data!=undefined) {
          this.dataSource.data = data
        }
        this.showMessage("Registro não encontrado")

      },
      error: (error) =>  this.showMessage(""+error)
    });
  }

  clearFilter() {
    this.filtro = '';
    this.listarDados()
    this.applyFilter();
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
