import {AfterViewInit, ChangeDetectorRef, Directive, inject, Inject, OnInit, ViewChild} from '@angular/core';
import {AbstractService} from "../abstract.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SecurityService} from "../../architecture/security/security.service";
import {NotificationsService} from "angular2-notifications";
import {MessageService} from "../../architecture/message/message.service";
import {MatSort} from "@angular/material/sort";

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
  public dialogRef!: MatDialogRef<any>;
  filtro: string = '';
  permissionConfig: PermissionConfig;

  pageNumber: number = 0;
  pageSize: number = 10;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  protected notificationsService: NotificationsService = inject(NotificationsService);
  protected messageService: MessageService = inject(MessageService);
  protected changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef)

  public constructor(public service: AbstractService<any>,
                     @Inject(MAT_DIALOG_DATA) public data: any,
                     public dialog: MatDialog, public dialogRefCurrent: MatDialogRef<any>) {
    this.columnNamesMapping = this.getColumnNamesMapping();
    this.permissionConfig = this.getPermissions();
    this.dataSource.paginator = this.paginator;
  }

  protected securityService: SecurityService = inject(SecurityService);


  ngOnInit(): void {
    this.listarDados();
  }
  ngAfterViewInit(): void {
  }

  protected abstract getColumnNamesMapping(): { [key: string]: string };

  listarDados(): void {
    this.notificationsService.remove();
    this.service.listar(this.filtroObjeto, this.pageNumber, this.pageSize, this.getSortData()).subscribe({
      next: (data: any) => {
        this.dataSource.data = data.content.map((item: any) => {
          // Itera sobre cada propriedade do item
          for (const key in item) {
            if (Object.prototype.hasOwnProperty.call(item, key)) {
              const value = item[key];
              // Verifica se o nome do campo contém "date" e formata se for uma data válida
              if (key.toLowerCase().includes('date') && this.isValidDate(value)) {
                item[key] = this.formatDate(value);
              }
              if (key.toLowerCase().includes('approval')) {
                item[key] = item[key] ? 'Ativo' : 'Inativo';
              }
            }
          }
          return item;
        });
        this.paginator.pageIndex = data.pageable.pageNumber;
        this.paginator.pageSize = data.pageable.pageSize;
        this.paginator.length = data.totalElements;

        this.changeDetector.detectChanges();
      },
    });
  }

  getSortData() {
    let sortData;
    if (this.sort?.active) {
      sortData = {
        sortParam: this.sort.active,
        sortDirection: this.sort.direction
      }
    } else {
      sortData = null;
    }
    return sortData;
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
          console.log("valor exclusão",element)
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
