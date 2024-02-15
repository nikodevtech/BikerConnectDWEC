import { Injectable } from '@angular/core';
import { BaseDatosService } from './base-datos.service';
import { Quedada } from '../modelo/quedada';
import { Observable } from 'rxjs';
import { DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class QuedadaService {

  constructor(private baseDatosServicio: BaseDatosService) { }

  obtenerQuedadas(): Observable<Quedada[]> {
    return this.baseDatosServicio.obtenerTodos('quedadas');  
  }

  registrarQuedada(quedada: Quedada): Promise<DocumentReference<Quedada>> {
    return this.baseDatosServicio.insertar('quedadas', quedada);
  }
}
