import { Usuario } from 'src/app/modelo/usuario';
import { BaseDatosService } from './../../../servicios/base-datos.service';
import { Component } from '@angular/core';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css'],
})
export class ListaUsuariosComponent {
  usuarios: Usuario[] = [];

  constructor(
    private notificacionesServicio: NotificacionesService,
    private baseDatosServicio: BaseDatosService
  ) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.baseDatosServicio.obtenerTodos('usuarios').subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios.map(usuario => {
        return {
          ...usuario,
          fechaRegistro: this.convertirTimestampADate(usuario.fechaRegistro)
        };
      });
    });
  }
  convertirTimestampADate(timestamp: any): Date {
    return timestamp.toDate();
  }
  eliminarUsuario(id: string, email: string) {
    this.notificacionesServicio.confirmarEliminar(
      id,
      email,
      'usuario',
      'usuarios'
    );
  }
}
