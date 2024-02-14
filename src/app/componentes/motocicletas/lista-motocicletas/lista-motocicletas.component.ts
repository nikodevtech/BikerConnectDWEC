import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Moto } from 'src/app/modelo/moto';
import { MotoService } from 'src/app/servicios/moto.service';

@Component({
  selector: 'app-lista-motocicletas',
  templateUrl: './lista-motocicletas.component.html',
  styleUrls: ['./lista-motocicletas.component.css']
})
export class ListaMotocicletasComponent {

  misMotos: Moto[] = [];

  constructor(private motoService: MotoService, private router: Router) { }

  ngOnInit(): void {
    // this.obtenerMisMotos();
  }

/*   obtenerMisMotos() {
    this.motoService.obtenerMisMotos().subscribe(
      (data: Moto[]) => {
        this.misMotos = data;
      },
      (error) => {
        console.error('Error al obtener las motos:', error);
      }
    );
  } */

  confirmarEliminarMoto(id: string) {
    // Aquí puedes implementar la lógica para mostrar el mensaje de confirmación con SweetAlert
    // y luego llamar al método para eliminar la moto con el id proporcionado.
  }
}
