import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaQuedadasComponent } from './lista-quedadas.component';

describe('ListaQuedadasComponent', () => {
  let component: ListaQuedadasComponent;
  let fixture: ComponentFixture<ListaQuedadasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaQuedadasComponent]
    });
    fixture = TestBed.createComponent(ListaQuedadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
