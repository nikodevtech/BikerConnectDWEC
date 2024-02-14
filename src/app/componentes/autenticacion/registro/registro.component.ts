import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/modelo/usuario';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  formularioRegistro: FormGroup;
  tipoRegistro: string = '';

  constructor(
    private usuarioServicio: UsuarioService,
    private router: Router,
    private baseDatosService: BaseDatosService,
    private notificacionesServicio :NotificacionesService,
    private route: ActivatedRoute
  ) {
    this.formularioRegistro = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      apellidos: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
    })
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.tipoRegistro = params['from'] || ''; 
    });
  }

  onSubmit() {
    
    this.usuarioServicio.registrar(this.formularioRegistro.value)
      .then(response => {
        console.log(response);
        this.insertarUserEnFirebase();
      })
      .catch(error => {
        console.log(error);
        if (error.code === 'auth/weak-password') {
          this.notificacionesServicio.mostrarNotificacion('Contraseña introducida débil', 'Debe tener al menos 6 caracteres', 'error');
        } else if(error.code === 'auth/email-already-in-use') {
          this.notificacionesServicio.mostrarNotificacion('El correo electrónico ya registrado', 'La cuenta de correo electrónico ya está en uso', 'error');
        } else if(error.code === 'auth/invalid-email'){
          this.notificacionesServicio.mostrarNotificacion('Email incorrecto', 'El email introducido no es valido', 'error');
        } else if(error.code === 'auth/missing-password'){
          this.notificacionesServicio.mostrarNotificacion('Introduzca una contraseña', 'Proporcione una contraseña para el registro', 'error');
        } else {  
          console.log('Error de Firebase:', error);
        }
      });

      

  }
  
  insertarUserEnFirebase(){
    const usuario: Usuario ={
      nombre: this.formularioRegistro.value.nombre,
      apellidos: this.formularioRegistro.value.apellidos,
      email: this.formularioRegistro.value.email,
      telefono: this.formularioRegistro.value.telefono,
      password: this.formularioRegistro.value.password,
      rol: 'ROLE_USER',
      fechaRegistro: new Date(),
    }
    this.baseDatosService.insertar('usuarios', usuario).then(() => {
      if (this.tipoRegistro === 'admin') {
        this.notificacionesServicio.mostrarNotificacion('Registro completado con exito', 'Cuenta creada, el usuari puede hacer uso de ella.', 'success');
        this.router.navigate(['/administracion/listado-usuarios']);
      } else {
        this.notificacionesServicio.mostrarNotificacion('Registro completado con exito', 'Su cuenta ha sido creada, ahora puede iniciar sesión.', 'success');
        this.router.navigate(['/autenticacion/login']);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

}
