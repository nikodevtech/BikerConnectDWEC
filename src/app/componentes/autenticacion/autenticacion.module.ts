import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutenticacionRoutingModule } from './autenticacion-routing.module';
import { AutenticacionComponent } from './autenticacion.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecuperarPasswordComponent } from './recuperar-password/recuperar-password.component';


@NgModule({
  declarations: [
    AutenticacionComponent,
    RegistroComponent,
    LoginComponent,
    DashboardComponent,
    RecuperarPasswordComponent,
    
  ],
  imports: [
    CommonModule,
    AutenticacionRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AutenticacionModule { }
