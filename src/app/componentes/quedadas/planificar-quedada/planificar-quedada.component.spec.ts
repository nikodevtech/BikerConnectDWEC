import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificarQuedadaComponent } from './planificar-quedada.component';

describe('PlanificarQuedadaComponent', () => {
  let component: PlanificarQuedadaComponent;
  let fixture: ComponentFixture<PlanificarQuedadaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanificarQuedadaComponent]
    });
    fixture = TestBed.createComponent(PlanificarQuedadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
