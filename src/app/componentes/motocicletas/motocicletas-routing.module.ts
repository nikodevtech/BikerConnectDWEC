import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MotocicletasComponent } from './motocicletas.component';
import { ListaMotocicletasComponent } from './lista-motocicletas/lista-motocicletas.component';
import { RegistroMotocicletaComponent } from './registro-motocicleta/registro-motocicleta.component';
import { administracionGuard } from 'src/app/guards/administracion.guard';

const routes: Routes = [
  { path: '', component: MotocicletasComponent, children:[
    { path: 'mis-motocicletas', component: ListaMotocicletasComponent },
    { path: 'registrar-motocicleta/:id', component: RegistroMotocicletaComponent },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MotocicletasRoutingModule { }
