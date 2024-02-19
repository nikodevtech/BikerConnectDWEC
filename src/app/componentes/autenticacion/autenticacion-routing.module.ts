import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacionComponent } from './autenticacion.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { RecuperarPasswordComponent } from './recuperar-password/recuperar-password.component';

const routes: Routes = [
  { path: '', component: AutenticacionComponent, children:[
    { 
      path: 'dashboard', 
      component: DashboardComponent, 
      ...canActivate(()=> redirectUnauthorizedTo(['/autenticacion/registrar']))
    },
    { path: 'registrar', component: RegistroComponent },
    { path: 'login', component: LoginComponent},
    { path: 'recuperar-password', component: RecuperarPasswordComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutenticacionRoutingModule { }
