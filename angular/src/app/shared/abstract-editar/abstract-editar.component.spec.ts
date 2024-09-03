import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractEditarComponent } from './abstract-editar.component';

describe('AbstractEditarComponent', () => {
  let component: AbstractEditarComponent;
  let fixture: ComponentFixture<AbstractEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbstractEditarComponent]
    });
    fixture = TestBed.createComponent(AbstractEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
