import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Moto } from 'src/app/modelo/moto';
import { Usuario } from 'src/app/modelo/usuario';
import { MotoService } from 'src/app/servicios/moto.service';
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
    private usuarioServicio: UsuarioService
  ) {
    this.usuarioServicio.guardarUsuarioEnLocalStorage();
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

  confirmarEliminarMoto(id: string) {
    // Aquí puedes implementar la lógica para mostrar el mensaje de confirmación con SweetAlert
    // y luego llamar al método para eliminar la moto con el id proporcionado.
  }
}
