import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMessageConfirmComponent } from './dialog-message-confirm.component';

describe('DialogMessageConfirmComponent', () => {
  let component: DialogMessageConfirmComponent;
  let fixture: ComponentFixture<DialogMessageConfirmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogMessageConfirmComponent]
    });
    fixture = TestBed.createComponent(DialogMessageConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
