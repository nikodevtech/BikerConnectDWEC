import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Moto } from 'src/app/modelo/moto';
import { Usuario } from 'src/app/modelo/usuario';
import { MotoService } from 'src/app/servicios/moto.service';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-lista-motocicletas',
  templateUrl: './lista-motocicletas.component.html',
  styleUrls: ['./lista-motocicletas.component.css'],
})
export class ListaMotocicletasComponent {
  usuarioActual: Usuario | undefined;
  misMotos: Moto[] = [];

  constructor(
    private motoService: MotoService,
    private router: Router,
    private usuarioServicio: UsuarioService,
    private notificacionesServicio: NotificacionesService
  ) {
    this.usuarioActual = this.usuarioServicio.obtenerUsuarioDeLocalStorage();
  }

  ngOnInit(): void {
    if(this.usuarioActual!==undefined && this.usuarioActual.id !== undefined) {
      this.motoService.obtenerMisMotos(this.usuarioActual.id).subscribe(
        (data: Moto[]) => {
          this.misMotos = data;
        }
      );
    }
  }

  confirmarEliminarMoto(id: string, marca: string, modelo: string) {
    const motoAeliminar: Moto= this.misMotos.find(
      (moto) => moto.id === id
    )!;

    this.notificacionesServicio.confirmarEliminarMoto(
      id,
      marca,
      modelo,
      'motos',
      this.misMotos,
      this.usuarioActual
    );
  }
}
