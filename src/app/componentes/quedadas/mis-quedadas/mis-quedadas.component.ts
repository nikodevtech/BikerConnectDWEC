import { Component } from '@angular/core';
import { Quedada } from 'src/app/modelo/quedada';
import { QuedadaService } from 'src/app/servicios/quedada.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-mis-quedadas',
  templateUrl: './mis-quedadas.component.html',
  styleUrls: ['./mis-quedadas.component.css']
})
export class MisQuedadasComponent {

  misQuedadas: Quedada[] = [];

  constructor(private quedadaServicio: QuedadaService, private usuarioServicio: UsuarioService) { }

  ngOnInit(): void {
    this.obtenerMisQuedadas();
  }

  obtenerMisQuedadas() {
    const usuarioActual = this.usuarioServicio.obtenerUsuarioDeLocalStorage();
    console.log('Usuario actual:', usuarioActual);
    if (usuarioActual && usuarioActual.misQuedadas && usuarioActual.misQuedadas.length > 0) {
      this.quedadaServicio.obtenerQuedadasPorIds(usuarioActual.misQuedadas).subscribe((quedadas: Quedada[]) => {
        this.misQuedadas = quedadas;
      });
    }
  }
}
