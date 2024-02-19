import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private notificacionesServicio: NotificacionesService
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

  confirmarCancelarQuedada(event: Event) {
    // Aquí deberías implementar la lógica para confirmar o cancelar la quedada
    // Puedes usar el ID de la quedada que está en el atributo 'data-id' del botón
    const quedadaId = (event.target as HTMLElement).getAttribute('data-id');
    if (quedadaId) {
      // Llama a tu servicio para confirmar o cancelar la quedada
      // this.quedadaService.confirmarCancelarQuedada(quedadaId);
    }
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
      console.log(this.usuarioActual);
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
      return; // Sale del método y no permite cancelar la asistencia
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

        // Llamar al servicio para cancelar la asistencia a la quedada
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
}
