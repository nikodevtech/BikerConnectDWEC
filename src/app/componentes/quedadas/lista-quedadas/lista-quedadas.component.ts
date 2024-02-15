import { Component } from '@angular/core';
import { Quedada } from 'src/app/modelo/quedada';

@Component({
  selector: 'app-lista-quedadas',
  templateUrl: './lista-quedadas.component.html',
  styleUrls: ['./lista-quedadas.component.css']
})
export class ListaQuedadasComponent {

  quedadas: Quedada[] = []; // Asegúrate de inicializar el arreglo quedadas

  constructor() { }

  ngOnInit(): void {
    // En este método ngOnInit puedes llamar a un servicio para obtener las quedadas desde el backend
    // Por ejemplo:
    // this.obtenerQuedadas();
  }

  // Método para obtener las quedadas desde el backend (puedes llamar a un servicio)
  // obtenerQuedadas() {
  //   this.quedadaService.obtenerQuedadas().subscribe((quedadas: Quedada[]) => {
  //     this.quedadas = quedadas;
  //   });
  // }
}
