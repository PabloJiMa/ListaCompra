import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesoIncorrectoComponent } from './acceso-incorrecto.component';

describe('AccesoIncorrectoComponent', () => {
  let component: AccesoIncorrectoComponent;
  let fixture: ComponentFixture<AccesoIncorrectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccesoIncorrectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesoIncorrectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
