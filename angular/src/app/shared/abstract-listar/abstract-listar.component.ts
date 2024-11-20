import {AfterViewInit, Directive, inject, Inject, OnInit, ViewChild} from '@angular/core';
import {AbstractService} from "../abstract.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SecurityService} from "../../architecture/security/security.service";
import {NotificationsService} from "angular2-notifications";
import {MessageService} from "../../architecture/message/message.service";

export type RoleConfig = {
  CREATE_ROLE?: string,
  UPDATE_ROLE?: string,
  DELETE_ROLE?: string,
  READ_ROLE?: string,
};

type PermissionConfig = {
  HAS_PERMISSION_CREATE?: boolean,
  HAS_PERMISSION_UPDATE?: boolean,
  HAS_PERMISSION_DELETE?: boolean,
  HAS_PERMISSION_READ?: boolean,
};


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
  permissionConfig: PermissionConfig;

  protected notificationsService: NotificationsService = inject(NotificationsService);
  protected messageService: MessageService = inject(MessageService);

  public constructor(public service: AbstractService<any>,
                     @Inject(MAT_DIALOG_DATA) public data: any,
                     public dialog: MatDialog, public dialogRefCurrent: MatDialogRef<any>) {
    this.columnNamesMapping = this.getColumnNamesMapping();
    this.permissionConfig = this.getPermissions();
  }

  protected securityService: SecurityService = inject(SecurityService);


  ngOnInit(): void {
    this.listarDados();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

  }

  protected abstract getColumnNamesMapping(): { [key: string]: string };

  listarDados(): void {
    this.notificationsService.remove();
    this.service.listar(this.filtroObjeto, this.pageNumber, this.pageSize).subscribe({
      next: (data) => {
        this.dataSource.data = data.map((item: any) => {
          // Itera sobre cada propriedade do item
          for (const key in item) {
            if (Object.prototype.hasOwnProperty.call(item, key)) {
              const value = item[key];
              // Verifica se o nome do campo contém "date" e formata se for uma data válida
              if (key.toLowerCase().includes('date') && this.isValidDate(value)) {
                item[key] = this.formatDate(value);
              }
            }
          }
          return item;
        });
      },
    });
  }

// Função para verificar se um valor é uma data válida
  isValidDate(value: any): boolean {
    return !isNaN(Date.parse(value));
  }

// Função para formatar a data
  formatDate(date: any): string {
    const parsedDate = new Date(date);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(parsedDate);
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
    this.notificationsService.remove();
    this.messageService.addConfirmYesNo(`Você deseja excluir esse registro? Essa ação é irreversível!`,() => {
      this.service.excluir(element.id).subscribe({
        next: () => {
          this.notificationsService.success("Registro excluido com sucesso!");
          this.listarDados()
        }
      });
    });
  }

  exportarPdf(id: any): void {
    this.notificationsService.remove();
    this.service.exportarPdf(id).subscribe({
      next: (data) => {
        let blob = new Blob([data], {type: 'application/pdf'});
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
    this.notificationsService.remove();
    this.service.filter(this.filtro).subscribe({
      next: (data) => {
        if (data != null) {
          this.dataSource.data = data
        }
        this.notificationsService.error("Registro não encontrado")
      }
    });
  }

  clearFilter() {
    this.filtro = '';
    this.listarDados()
    this.applyFilter();
  }

  abstract getRoles(): RoleConfig;

  private getPermissions(): PermissionConfig {
    let config: RoleConfig = this.getRoles();
    return {
      HAS_PERMISSION_CREATE: this.securityService.hasRoles(config.CREATE_ROLE ? config.CREATE_ROLE : ''),
      HAS_PERMISSION_UPDATE: this.securityService.hasRoles(config.UPDATE_ROLE ? config.UPDATE_ROLE : ''),
      HAS_PERMISSION_DELETE: this.securityService.hasRoles(config.DELETE_ROLE ? config.DELETE_ROLE : ''),
      HAS_PERMISSION_READ: this.securityService.hasRoles(config.READ_ROLE ? config.READ_ROLE : ''),
    };
  }

  protected getShowActions(): boolean {
    return false;
  }
  protected getShowFilter(): boolean {
    return false;
  }
  protected getShowExportPdf(): boolean {
    return false;
  }
}
