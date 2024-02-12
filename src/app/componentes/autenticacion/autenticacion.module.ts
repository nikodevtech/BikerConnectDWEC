import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutenticacionRoutingModule } from './autenticacion-routing.module';
import { AutenticacionComponent } from './autenticacion.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AutenticacionComponent,
    RegistroComponent,
    LoginComponent,
    DashboardComponent,
    
  ],
  imports: [
    CommonModule,
    AutenticacionRoutingModule,
    ReactiveFormsModule,
  ]
})
export class AutenticacionModule { }
