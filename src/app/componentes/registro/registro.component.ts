import { NotificacionesService } from './../../servicios/notificaciones.service';
import { Usuario } from './../../modelo/usuario';
import { BaseDatosService } from './../../servicios/base-datos.service';
import { UsuarioService } from './../../servicios/usuario.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  formularioRegistro: FormGroup;

  constructor(
    private usuarioServicio: UsuarioService,
    private router: Router,
    private baseDatosService: BaseDatosService,
    private notificacionesServicio :NotificacionesService
  ) {
    this.formularioRegistro = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      nombre: new FormControl(),
      apellidos: new FormControl(),
      telefono: new FormControl()
    })
  }

  onSubmit() {
    this.usuarioServicio.registrar(this.formularioRegistro.value)
      .then(response => {
        console.log(response);
        this.insertarEnFirebase();
      })
      .catch(error => {
        console.log(error);
        if (error.code === 'auth/weak-password') {
          this.notificacionesServicio.mostrarNotificacion('Contraseña introducida insegura', 'La contraseña debe tener al menos 6 caracteres', 'error');
        } else {
          console.error('Error de Firebase:', error);
        }
      });

  }
  
  insertarEnFirebase(){
    const usuario: Usuario ={
      nombre: this.formularioRegistro.value.nombre,
      apellidos: this.formularioRegistro.value.apellidos,
      email: this.formularioRegistro.value.email,
      telefono: this.formularioRegistro.value.telefono,
      password: this.formularioRegistro.value.password
    }
    this.baseDatosService.insertar('usuarios', usuario).then(() => {
      this.notificacionesServicio.mostrarNotificacion('Usuario registrado', 'El usuario ha sido registrado con exito', 'success');
      this.router.navigate(['/login']);
    })
    .catch((error) => {
      console.log(error);
    });
  }

}
