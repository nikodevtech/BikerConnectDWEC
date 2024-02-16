import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuedadasComponent } from './quedadas.component';
import { PlanificarQuedadaComponent } from './planificar-quedada/planificar-quedada.component';
import { MisQuedadasComponent } from './mis-quedadas/mis-quedadas.component';
import { ListaQuedadasComponent } from './lista-quedadas/lista-quedadas.component';
import { DetalleQuedadaComponent } from './detalle-quedada/detalle-quedada.component';

const routes: Routes = [
  { path: '', component: QuedadasComponent, children:[
    { path: 'listado-quedadas', component: ListaQuedadasComponent },
    { path: 'mis-quedadas', component: MisQuedadasComponent },
    { path: 'planificar-quedada', component: PlanificarQuedadaComponent },
    { path: 'detalle-quedada/:id', component: DetalleQuedadaComponent },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuedadasRoutingModule { }
