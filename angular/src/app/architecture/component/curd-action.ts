
import { ActivatedRoute } from '@angular/router';

export enum CrudActionEnum {
  LIST = 'list',
  CREATE = 'create',
  ALTER = 'alter',
  VIEW = 'view'
}


export class CrudAction {

  private action!: CrudActionEnum;

  constructor(route?: ActivatedRoute) {
    this.setAction(route);
  }

  public setAction(route?: ActivatedRoute): void {
    if (route) {
      let dataParent = route.snapshot.data['crud_action'];
      this.action = dataParent ?? route.snapshot.firstChild?.data['crud_action'];
    }
  }

  public isActionCreate(): boolean {
    return CrudActionEnum.CREATE === this.action;
  }

  public isActionAlter(): boolean {
    return CrudActionEnum.ALTER === this.action;
  }

  public isActionList(): boolean {
    return CrudActionEnum.LIST === this.action;
  }

  public isActionView(): boolean {
    return CrudActionEnum.VIEW === this.action;
  }

  //adicionar depois
  get labelAction(): string {
    let actionReturn;
    switch (this.action) {
      case CrudActionEnum.CREATE: actionReturn = "Incluir"; break;
      case CrudActionEnum.ALTER: actionReturn = "Editar"; break;
      case CrudActionEnum.LIST: actionReturn = "Listar"; break;
      case CrudActionEnum.VIEW: actionReturn = "Visualizar"; break;
      default: actionReturn = "view";
    }
    return actionReturn;
  }
  //adicionado depois
  static getCrudAction(action: CrudActionEnum): CrudAction {
    let crudAction = new CrudAction();
    crudAction.action = action;
    return crudAction;
  }
}
