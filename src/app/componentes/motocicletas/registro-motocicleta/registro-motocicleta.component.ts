import { Usuario } from 'src/app/modelo/usuario';
import { BaseDatosService } from './../../../servicios/base-datos.service';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Moto } from 'src/app/modelo/moto';
import { MotoService } from 'src/app/servicios/moto.service';
import { mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { UsuarioService } from 'src/app/servicios/usuario.service';


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
    private notificacionesServicio :NotificacionesService,
    private baseDatosServicio: BaseDatosService,
    private usuarioServicio: UsuarioService,
    private router: Router
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
        this.router.navigate(['/motocicletas/mis-motocicletas']);
      })
      .catch((error) => {
        console.error('Error al registrar la moto:', error);
      });

      const usuario: Usuario = this.usuarioServicio.obtenerUsuarioDeLocalStorage();
      if(usuario){
        if(usuario.misMotos){
          usuario.misMotos.push(this.moto);
        }else{
          usuario.misMotos = [this.moto];
        }
        this.baseDatosServicio.actualizar('usuarios', usuario).then(() => {
            console.log('Usuario actualizado correctamente');
          }
        );
      }
  }
  
  

}
