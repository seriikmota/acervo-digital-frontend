import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {CrudAction} from "./curd-action";
import {ChangeDetectorRef, NgModule, OnDestroy, OnInit} from "@angular/core";
import {CrudActionService} from "./crud-action.service";
import {Subscription} from "rxjs";

@NgModule()
export abstract class BaseComponent implements OnInit, OnDestroy {
  public crudAction: CrudAction;
  public pkValue!: any;

  private navigationSubscription: Subscription;

  protected constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected changeDetector: ChangeDetectorRef,
    protected crudActionService: CrudActionService
  ) {
    this.crudAction = new CrudAction(this.route);
    this.crudActionService.onListChange.subscribe(value => {
      this.crudAction.setAction(this.route);
      this.changeDetector.detectChanges();
    });
    this.navigationSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.crudAction.setAction(this.route);
      }
    });

  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.crudAction.setAction(this.route);
    this.crudActionService.onListChange.emit(this.crudAction);
  }

  public formGroup!: FormGroup;

  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  }

  public parseDate(dateString: string): Date {
    const [year, month, day] = dateString.split('-').map(num => parseInt(num, 10));
    return new Date(year, month - 1, day); // Meses no Date são 0-indexados
  }

}
