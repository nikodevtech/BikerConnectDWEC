import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MotocicletasComponent } from './motocicletas.component';
import { ListaMotocicletasComponent } from './lista-motocicletas/lista-motocicletas.component';
import { RegistroMotocicletaComponent } from './registro-motocicleta/registro-motocicleta.component';

const routes: Routes = [
  { path: '', component: MotocicletasComponent, children:[
    { path: 'mis-motocicletas', component: ListaMotocicletasComponent },
    { path: 'registrar-motocicleta', component: RegistroMotocicletaComponent },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MotocicletasRoutingModule { }
