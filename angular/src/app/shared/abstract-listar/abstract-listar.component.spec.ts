import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractListarComponent } from './abstract-listar.component';

describe('AbstractListarComponent', () => {
  let component: AbstractListarComponent;
  let fixture: ComponentFixture<AbstractListarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbstractListarComponent]
    });
    fixture = TestBed.createComponent(AbstractListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
