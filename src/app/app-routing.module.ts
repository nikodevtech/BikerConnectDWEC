import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { BienvenidaComponent } from './core/bienvenida/bienvenida.component';

const routes: Routes = [
  {path: '', component: BienvenidaComponent},
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    ...canActivate(()=> redirectUnauthorizedTo(['/registrar']))
  },
  { path: 'registrar', component: RegistroComponent },
  { path: 'login', component: LoginComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
