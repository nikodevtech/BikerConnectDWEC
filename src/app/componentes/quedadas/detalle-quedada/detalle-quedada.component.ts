import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quedada } from 'src/app/modelo/quedada';
import { Usuario } from 'src/app/modelo/usuario';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { QuedadaService } from 'src/app/servicios/quedada.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-detalle-quedada',
  templateUrl: './detalle-quedada.component.html',
  styleUrls: ['./detalle-quedada.component.css'],
})
export class DetalleQuedadaComponent {
  quedada: Quedada | undefined;
  usuarioActual: Usuario | undefined;

  constructor(
    private quedadaServicio: QuedadaService,
    private route: ActivatedRoute,
    private usuarioServicio: UsuarioService,
    private notificacionesServicio: NotificacionesService,
  ) {}

  ngOnInit(): void {
    this.usuarioActual = this.usuarioServicio.obtenerUsuarioDeLocalStorage();
    const quedadaId = this.route.snapshot.params['id'];
    this.quedadaServicio
      .obtenerQuedada(quedadaId)
      .subscribe((quedada: Quedada) => {
        this.quedada = quedada;
      });
  }

  confirmarCancelarQuedada(quedadaId: string, fechaQuedada: Date) {
    const fechaActual = new Date();
    const fechaQuedadaDate = new Date(fechaQuedada);

    // Verifica si la fecha actual es posterior a la fecha de la quedada
    if (this.quedada?.fechaHora && fechaActual >= fechaQuedadaDate) {
      console.log(
        'La fecha de la quedada ya ha pasado',
        this.quedada?.fechaHora,
        fechaActual
      );
      // Muestra un mensaje indicando que la fecha de la quedada ha pasado y no se puede cancelar
      this.notificacionesServicio.mostrarNotificacion(
        'No puede cancelar la quedada',
        'La fecha de la quedada ya ha pasado. En este caso solo puedes marcarla como completada',
        'info'
      );
      return; // Sale del método y no permite cancelar a la quedada
    }

    // Si llega a este punto quiere decir que la fecha de la quedada
    // no ha pasado todavía y se puede cancelar
    this.quedadaServicio
      .cancelarQuedada(quedadaId)
      .then(() => {
        console.log('La quedada ha sido cancelada');
        this.notificacionesServicio.mostrarNotificacion(
          'Quedada cancelada',
          'La quedada ha sido cancelada correctamente',
          'success'
        );
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      })
      .catch((error) => {
        console.error('Error al cancelar la quedada:', error);
        this.notificacionesServicio.mostrarNotificacion(
          'Error al cancelar la quedada',
          'Ha ocurrido un error al cancelar la quedada. Por favor, inténtalo de nuevo más tarde',
          'error'
        );
      });
  }

  unirseQuedada() {
    // Verifica si el usuario tiene motos registradas
    if (
      this.usuarioActual &&
      this.usuarioActual.misMotos &&
      this.usuarioActual.misMotos.length > 0
    ) {
      // Si tiene motos registradas, verifica si el usuario ya está incluido en la lista de participantes de la quedada
      if (
        this.quedada &&
        this.quedada.participantes &&
        this.quedada.participantes.some(
          (participante) => participante.id === this.usuarioActual?.id
        )
      ) {
        // Si el usuario ya está incluido en la lista de participantes de la quedada, muestra un mensaje
        console.log('El usuario ya está participando en esta quedada');
        this.notificacionesServicio.mostrarNotificacion(
          'Ya está registrado como asistente',
          'Estás incluido en la lista de participantes de esta quedada',
          'info'
        );
        return; // Sale del método y no permite unirse nuevamente a la quedada
      }

      // Si llega a este punto, el usuario no está en la lista de participantes de la quedada,
      //por lo tanto se añade al usuario como participante de la quedada
      this.quedada?.participantes?.push(this.usuarioActual!);

      // Agrega la quedada al array de quedadas del usuario
      if (!this.usuarioActual.misQuedadas) {
        this.usuarioActual.misQuedadas = [];
      }
      this.usuarioActual.misQuedadas.push(this.quedada?.id!);

      // Actualiza el usuario en localStorage
      this.usuarioServicio.actualizarUsuarioEnLocalStorage(this.usuarioActual);
      this.usuarioServicio.actualizarUsuario(this.usuarioActual!).then(() => {
        console.log('Se ha actualizado el usuario');
      });

      // Actualizar la quedada en firebase
      this.quedadaServicio.actualizarQuedada(this.quedada!).then(() => {
        console.log('Se ha unido la quedada');
        this.notificacionesServicio.mostrarNotificacion(
          '¡Su asistencia ha sido registrada!',
          'Ahora es un participante más de la quedada',
          'success'
        );
      });
    } else {
      console.log('El usuario no tiene motos para unirse a la quedada');
      this.notificacionesServicio.mostrarNotificacion(
        'Debe tener registrada una moto',
        'Para unirse a la quedada, por favor registre al menos una moto',
        'info'
      );
    }
  }

  cancelarAsistenciaQuedada(quedadaId: string, usuarioId: string) {
    // Verifica si el usuario está unido a la quedada
    if (
      !(
        this.usuarioActual &&
        this.usuarioActual.misQuedadas &&
        this.usuarioActual.misQuedadas.includes(quedadaId)
      )
    ) {
      // Si el usuario no está unido se le muestra un mensaje que no puede cancelar la asistencia
      this.notificacionesServicio.mostrarNotificacion(
        'No estás unido a esta quedada',
        'No puedes cancelar la asistencia a una quedada a la que no estás unido',
        'info'
      );
      return; // Sale del método para no permitir cancelar la asistencia
    }

    // Si llega a esta línea de código quiere decir que el usuario está unido
    // por lo tanto se busca y elimina el ID de la quedada del array misQuedadas del usuario
    if (this.usuarioActual && this.usuarioActual.misQuedadas) {
      const index = this.usuarioActual.misQuedadas.findIndex(
        (id) => id === quedadaId
      );
      if (index !== -1) {
        this.usuarioActual.misQuedadas.splice(index, 1);
      }
    }

    // Se actualiza el usuario sin la asistencia a la quedada en localStorage y en Firebase
    this.usuarioServicio.actualizarUsuarioEnLocalStorage(this.usuarioActual);
    this.usuarioServicio
      .actualizarUsuario(this.usuarioActual!)
      .then(() => {
        console.log(
          'Se ha actualizado el usuario después de cancelar la asistencia a la quedada'
        );

        // Se llama al servicio para cancelar la asistencia a la quedada
        this.quedadaServicio
          .cancelarAsistenciaQuedada(quedadaId, usuarioId)
          .then(() => {
            console.log('Se ha cancelado la asistencia a la quedada');
            this.notificacionesServicio.mostrarNotificacion(
              'Asistencia cancelada',
              'Se ha eliminado tu asistencia a la quedada',
              'info'
            );
          })
          .catch((error) => {
            console.error(
              'Error al cancelar la asistencia a la quedada:',
              error
            );
            this.notificacionesServicio.mostrarNotificacion(
              'Error',
              'Ha ocurrido un error al cancelar la asistencia a la quedada',
              'error'
            );
          });
      })
      .catch((error) => {
        console.error('Error al actualizar el usuario:', error);
        this.notificacionesServicio.mostrarNotificacion(
          'Error',
          'Ha ocurrido un error al actualizar el usuario',
          'error'
        );
      });
  }

  marcarComoCompletada(quedadaId: string, fechaQuedada: Date) {

    const fechaActual = new Date();
    const fechaQuedadaDate = new Date(fechaQuedada);

    // Verifica si la fecha actual es posterior a la fecha de la quedada
    if (this.quedada?.fechaHora && fechaActual <= fechaQuedadaDate) {
      console.log(
        'La fecha de la quedada no ha pasado aún',
        this.quedada?.fechaHora,
        fechaActual
      );
      // Muestra un mensaje indicando que la fecha de la quedada no ha pasado y no se puede marcar como completada
      this.notificacionesServicio.mostrarNotificacion(
        'No puede marcar la quedada como completada',
        'La fecha de la quedada no ha pasado. En este caso solo tienes la opción de cancelar la quedada',
        'info'
      );
      return; // Sale del método y no permite completar a la quedada
    }

    // Si llega a este punto quiere decir que la fecha de la quedada ha pasado y se puede marcar como completada
    this.quedadaServicio
      .marcarQuedadaComoCompletada(quedadaId)
      .then(() => {
        this.notificacionesServicio.mostrarNotificacion(
          'Quedada marcada como completada',
          'El estado de la quedada ha sido actualizado',
          'success'
        );
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      })
      .catch((error) => {
        console.error('Error al marcar la quedada como completada:', error);
        this.notificacionesServicio.mostrarNotificacion(
          'Error al marcar la quedada como completada',
          'No se ha podido actualizar el estado de la quedada a completada',
          'error'
        );
      });
  }
}
