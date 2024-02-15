import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisQuedadasComponent } from './mis-quedadas.component';

describe('MisQuedadasComponent', () => {
  let component: MisQuedadasComponent;
  let fixture: ComponentFixture<MisQuedadasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MisQuedadasComponent]
    });
    fixture = TestBed.createComponent(MisQuedadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
