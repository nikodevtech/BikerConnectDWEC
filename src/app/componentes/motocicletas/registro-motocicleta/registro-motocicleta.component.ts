import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Moto } from 'src/app/modelo/moto';
import { MotoService } from 'src/app/servicios/moto.service';

@Component({
  selector: 'app-registro-motocicleta',
  templateUrl: './registro-motocicleta.component.html',
  styleUrls: ['./registro-motocicleta.component.css'],
})
export class RegistroMotocicletaComponent {
  idPropietario: string = ''; 

  constructor(
    private motoService: MotoService,
    private route: ActivatedRoute,
    private notificacionesServicio :NotificacionesService
  ) {}

  ngOnInit(): void {
    this.idPropietario = this.route.snapshot.paramMap.get('id') || '';
  }

  moto: Moto = {
    marca: '',
    modelo: '',
    color: '',
    anyo: 0,
    descModificaciones: '',
    propietarioId: this.idPropietario,
  };

  submitForm() {
    this.motoService
      .registrarMoto(this.moto, this.idPropietario)
      .then(() => {
        console.log('Moto registrada correctamente');
        this.notificacionesServicio.mostrarNotificacion("Motocicleta registrada con éxito", "Su nueva moto ha sido registrada en el sistema", "success");
      })
      .catch((error) => {
        console.error('Error al registrar la moto:', error);
      });
  }
}
