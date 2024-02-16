import { BaseDatosService } from './../../../servicios/base-datos.service';
import { Component } from '@angular/core';
import { Usuario } from 'src/app/modelo/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  emailUsuarioActual: string | undefined | null;
  usuarioActual: Usuario | undefined;

  constructor(
    private usuarioServicio: UsuarioService,
    private baseDatosServicio: BaseDatosService
  ) {
    localStorage.clear();
    this.usuarioServicio.guardarUsuarioEnLocalStorage();
  }

  ngOnInit(): void {

    this.emailUsuarioActual = this.usuarioServicio.obtenerUsuarioActual()?.email;
    
    this.baseDatosServicio
      .obtenerPorFiltro('usuarios', 'email', this.emailUsuarioActual)
      .subscribe((data) => {
        this.usuarioActual = data[0];
      });
  }
}
