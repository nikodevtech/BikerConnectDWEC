import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleQuedadaComponent } from './detalle-quedada.component';

describe('DetalleQuedadaComponent', () => {
  let component: DetalleQuedadaComponent;
  let fixture: ComponentFixture<DetalleQuedadaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleQuedadaComponent]
    });
    fixture = TestBed.createComponent(DetalleQuedadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
