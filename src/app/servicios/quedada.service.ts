import { Injectable } from '@angular/core';
import { BaseDatosService } from './base-datos.service';
import { Quedada } from '../modelo/quedada';
import { Observable, map, switchMap, take } from 'rxjs';
import { DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class QuedadaService {
  constructor(private baseDatosServicio: BaseDatosService) {}

  obtenerQuedadas(): Observable<Quedada[]> {
    return this.baseDatosServicio.obtenerTodos('quedadas');
  }

  registrarQuedada(quedada: Quedada): Promise<DocumentReference<Quedada>> {
    if (!quedada.participantes || !Array.isArray(quedada.participantes)) {
      quedada.participantes = [];
    }
    return this.baseDatosServicio.insertar('quedadas', quedada);
  }

  obtenerQuedada(id: string): Observable<Quedada> {
    return this.baseDatosServicio.obtenerPorId('quedadas', id);
  }

  actualizarQuedada(quedada: Quedada): Promise<void> {
    return this.baseDatosServicio.actualizar('quedadas', quedada);
  }

  obtenerQuedadasPorIds(ids: string[]): Observable<Quedada[]> {
    return this.baseDatosServicio
      .obtenerTodos('quedadas')
      .pipe(
        map((quedadas: Quedada[]) =>
          quedadas.filter((quedada) => ids.includes(quedada.id!))
        )
      );
  }

  cancelarAsistenciaQuedada(
    quedadaId: string,
    usuarioId: string
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.obtenerQuedada(quedadaId)
        .pipe(
          take(1),
          map((quedada: Quedada) => {
            // Se filtra de la quedada el usuario actual de la lista de participantes
            quedada.participantes = quedada.participantes?.filter(
              (participante) => participante.id !== usuarioId
            );
            return quedada;
          }),
          switchMap((quedada: Quedada) =>
            this.baseDatosServicio.actualizar('quedadas', quedada)
          )
        )
        .subscribe({
          next: () => resolve(),
          error: (error) => reject(error),
        });
    });
  }
}
