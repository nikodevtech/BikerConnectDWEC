import { Component } from '@angular/core';
import { Moto } from 'src/app/modelo/moto';
import { MotoService } from 'src/app/servicios/moto.service';

@Component({
  selector: 'app-registro-motocicleta',
  templateUrl: './registro-motocicleta.component.html',
  styleUrls: ['./registro-motocicleta.component.css']
})
export class RegistroMotocicletaComponent {

  idPropietario: string = '1'; // Asigna el ID del propietario aquí

  moto: Moto = {
    marca: '',
    modelo: '',
    color: '',
    anyo: 0,
    descModificaciones: '',
    usuarioId: this.idPropietario
  };

  constructor(private motoService: MotoService) { }

  submitForm() {
    this.motoService.registrarMoto(this.moto, this.idPropietario)
/*       .then(() => {
        // Lógica después de registrar la moto
      })
      .catch(error => {
        console.error('Error al registrar la moto:', error);
      }); */
  }
}
