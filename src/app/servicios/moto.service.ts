import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import { Injectable } from '@angular/core';
import { Moto } from '../modelo/moto';
import { Observable } from 'rxjs';
import { DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MotoService {

  constructor(private baseDatosService :BaseDatosService) { }

  obtenerMisMotos(idPropietario: string): Observable<Moto[]> {
    return this.baseDatosService.obtenerPorFiltro('motos', 'propietarioId', idPropietario);
  }


  registrarMoto(moto: Moto, propietarioId: string): Promise<DocumentReference> {
    moto.propietarioId = propietarioId;
    return this.baseDatosService.insertar('motos', moto);
  }
}
