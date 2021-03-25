import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallelistacompraComponent } from './detallelistacompra.component';

describe('DetallelistacompraComponent', () => {
  let component: DetallelistacompraComponent;
  let fixture: ComponentFixture<DetallelistacompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallelistacompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallelistacompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
