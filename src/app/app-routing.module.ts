import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './core/bienvenida/bienvenida.component';

const routes: Routes = [
  { path: '', component: BienvenidaComponent},
  { path: 'autenticacion', loadChildren: () => import('./componentes/autenticacion/autenticacion.module').then(m => m.AutenticacionModule) },
  { path: 'administracion', loadChildren: () => import('./componentes/administracion/administracion.module').then(m => m.AdministracionModule) },
  { path: 'motocicletas', loadChildren: () => import('./componentes/motocicletas/motocicletas.module').then(m => m.MotocicletasModule) },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
