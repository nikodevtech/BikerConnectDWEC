import { Component } from '@angular/core';
import { Quedada } from 'src/app/modelo/quedada';
import { QuedadaService } from 'src/app/servicios/quedada.service';

@Component({
  selector: 'app-lista-quedadas',
  templateUrl: './lista-quedadas.component.html',
  styleUrls: ['./lista-quedadas.component.css']
})
export class ListaQuedadasComponent {

  quedadas: Quedada[] = []; 

  constructor(private quedadaServicio: QuedadaService) { }

  ngOnInit(): void {
    this.obtenerQuedadas();
  }

  obtenerQuedadas() {
    this.quedadaServicio.obtenerQuedadas().subscribe((quedadas: Quedada[]) => {
      this.quedadas = quedadas;
    });
    
  }

}
