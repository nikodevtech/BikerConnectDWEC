import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MotocicletasRoutingModule } from './motocicletas-routing.module';
import { MotocicletasComponent } from './motocicletas.component';
import { ListaMotocicletasComponent } from './lista-motocicletas/lista-motocicletas.component';
import { RegistroMotocicletaComponent } from './registro-motocicleta/registro-motocicleta.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MotocicletasComponent,
    ListaMotocicletasComponent,
    RegistroMotocicletaComponent
  ],
  imports: [
    CommonModule,
    MotocicletasRoutingModule,
    FormsModule
  ]
})
export class MotocicletasModule { }
