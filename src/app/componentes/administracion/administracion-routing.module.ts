import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministracionComponent } from './administracion.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';
import { guardAdministracionGuard } from 'src/app/guards/guard-administracion.guard';

const routes: Routes = [
  {
    path: '',
    component: AdministracionComponent,
    canActivate: [guardAdministracionGuard],
    children: [
      { path: 'listado-usuarios', component: ListaUsuariosComponent },
      { path: 'editar-usuario/:id', component: DetalleUsuarioComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministracionRoutingModule {}
