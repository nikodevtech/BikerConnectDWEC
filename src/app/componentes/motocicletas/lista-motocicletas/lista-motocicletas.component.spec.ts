import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMotocicletasComponent } from './lista-motocicletas.component';

describe('ListaMotocicletasComponent', () => {
  let component: ListaMotocicletasComponent;
  let fixture: ComponentFixture<ListaMotocicletasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaMotocicletasComponent]
    });
    fixture = TestBed.createComponent(ListaMotocicletasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
