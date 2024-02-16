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
    private notificacionesServicio :NotificacionesService
  ) {}

  ngOnInit(): void {
    this.usuarioActual = this.usuarioServicio.obtenerUsuarioDeLocalStorage();
    const quedadaId = this.route.snapshot.params['id'];
    this.quedadaServicio
      .obtenerQuedada(quedadaId)
      .subscribe((quedada: Quedada) => {
        this.quedada = quedada;
        // Si tienes un servicio para obtener los participantes de la quedada, aquí es donde deberías llamarlo
        // Por ahora, lo dejamos como un array vacío
        // this.participantes = this.quedadaService.obtenerParticipantes(quedadaId);
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
    // Verificar si el usuario tiene motos registradas
    if (this.usuarioActual && this.usuarioActual.misMotos && this.usuarioActual.misMotos.length > 0) {
      // Verificar si el usuario ya está incluido en la lista de participantes de la quedada
      if (this.quedada && this.quedada.participantes && this.quedada.participantes.some(participante => participante.id === this.usuarioActual?.id)) {
        console.log('El usuario ya está participando en esta quedada');
        this.notificacionesServicio.mostrarNotificacion('Ya está registrado como asistente', 'Estás incluido en la lista de participantes de esta quedada', 'info');
        return; // No permitir unirse nuevamente a la quedada
      }
      
      // Agregar al usuario como participante de la quedada
      this.quedada?.participantes?.push(this.usuarioActual!);
  
      // Agregar la quedada al array de quedadas del usuario
      if (!this.usuarioActual.misQuedadas) {
        this.usuarioActual.misQuedadas = [];
      }
      this.usuarioActual.misQuedadas.push(this.quedada?.id!);
  
      // Actualizar el usuario en localStorage y en la base de datos
      this.usuarioServicio.actualizarUsuarioEnLocalStorage(this.usuarioActual);
      console.log(this.usuarioActual);
      this.usuarioServicio.actualizarUsuario(this.usuarioActual!).then(() => {
        console.log('Se ha actualizado el usuario');
      });
  
      // Actualizar la quedada en la base de datos
      this.quedadaServicio.actualizarQuedada(this.quedada!).then(() => {
        console.log('Se ha unido la quedada');
        this.notificacionesServicio.mostrarNotificacion("¡Su asistencia ha sido registrada!", "Ahora es un participante más de la quedada", 'success');
      });
    } else {
      console.log('El usuario no tiene motos para unirse a la quedada');
      this.notificacionesServicio.mostrarNotificacion('Debe tener registrada una moto', 'Para unirse a la quedada, por favor registre al menos una moto', 'info');
    }
  }
  
}
