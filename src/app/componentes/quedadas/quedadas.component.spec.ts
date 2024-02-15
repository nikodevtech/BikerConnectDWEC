import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuedadasComponent } from './quedadas.component';

describe('QuedadasComponent', () => {
  let component: QuedadasComponent;
  let fixture: ComponentFixture<QuedadasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuedadasComponent]
    });
    fixture = TestBed.createComponent(QuedadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
