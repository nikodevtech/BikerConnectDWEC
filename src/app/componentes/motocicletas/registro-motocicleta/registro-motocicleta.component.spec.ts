import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroMotocicletaComponent } from './registro-motocicleta.component';

describe('RegistroMotocicletaComponent', () => {
  let component: RegistroMotocicletaComponent;
  let fixture: ComponentFixture<RegistroMotocicletaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroMotocicletaComponent]
    });
    fixture = TestBed.createComponent(RegistroMotocicletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
