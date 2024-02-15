import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuedadasRoutingModule } from './quedadas-routing.module';
import { QuedadasComponent } from './quedadas.component';
import { PlanificarQuedadaComponent } from './planificar-quedada/planificar-quedada.component';
import { MisQuedadasComponent } from './mis-quedadas/mis-quedadas.component';
import { ListaQuedadasComponent } from './lista-quedadas/lista-quedadas.component';


@NgModule({
  declarations: [
    QuedadasComponent,
    PlanificarQuedadaComponent,
    MisQuedadasComponent,
    ListaQuedadasComponent
  ],
  imports: [
    CommonModule,
    QuedadasRoutingModule
  ]
})
export class QuedadasModule { }
