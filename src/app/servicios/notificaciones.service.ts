import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { BaseDatosService } from './base-datos.service';
import { Usuario } from '../modelo/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NotificacionesService {
  constructor(
    private _baseDatosService: BaseDatosService,
    private usuarioServicio: UsuarioService,
    private router: Router
  ) {}

  /**
   * Muestra una ventana modal de notificación para el usuario.
   * @param titulo titulo del modal
   * @param mensaje mensaje que se muestra en el cuerpo del modal
   * @param tipo tipo del modal a mostrar
   */
  mostrarNotificacion(titulo: string, mensaje: string, tipo: any) {
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: tipo,
    });
  }

  confirmarLogout() {
    Swal.fire({
        title: '¿Estás seguro de que deseas cerrar sesión?',
        text: 'Serás redirigido a la página de bienvenida.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cerrar sesión'
    }).then((result) => {
        if (result.isConfirmed) {
          this.usuarioServicio.logout()
          .then(() => {
            this.router.navigate(['']);
          })
          .catch(error => console.log(error));
        } else {
            console.log('Logout cancelado');
        }
    });
}

  /**
   * Muestra una confirmación para eliminar un elemento y realiza la acción si es confirmada.
   * @param {string} id - Identificador único del elemento a eliminar.
   * @param {string} nombre - Nombre del elemento a eliminar.
   * @param {string} elementoEliminar - Tipo de elemento que se va a eliminar.
   * @param {string} coleccion - Nombre de la colección en la base de datos.
   * @param {Usuario} usuario  - usuario a eliminar
   */
  confirmarEliminar(
    id: string,
    nombre: string,
    elementoEliminar: string,
    coleccion: string,
    usuario: Usuario
  ) {
    Swal.fire({
      title: `¿Estás seguro de eliminar ${elementoEliminar} ${nombre}?`,
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3366ff',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si se confirma, realiza la eliminación a través del servicio FirebaseService
        this._baseDatosService
          .eliminar(coleccion, id)
          .then(() => {
            console.log(`${elementoEliminar} eliminado`);
            this.usuarioServicio.borrarUsuario(usuario);
          })
          .catch((error) => {
            console.log(error);
          });
        Swal.fire(
          // Muestra una notificación de éxito
          '¡Acción completada!',
          `${elementoEliminar} se ha eliminado con exito.`,
          'success'
        );
      }
    });
  }
}
