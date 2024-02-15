import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { Quedada } from 'src/app/modelo/quedada';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/modelo/usuario';
import { QuedadaService } from 'src/app/servicios/quedada.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planificar-quedada',
  templateUrl: './planificar-quedada.component.html',
  styleUrls: ['./planificar-quedada.component.css'],
})
export class PlanificarQuedadaComponent {
  usuarioActual: Usuario | undefined;
  formPlanificarQuedada: FormGroup;
  fechaMinima: string | undefined;

  constructor(
    private usuarioServicio: UsuarioService,
    private formBuilder: FormBuilder,
    private quedadaServicio: QuedadaService,
    private notificacionesServicio :NotificacionesService,
    private router: Router
  ) {
    this.formPlanificarQuedada = this.formBuilder.group({
      lugar: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaHora: ['', Validators.required],
      estado: ['Planificada', Validators.required],
    });
  }

  ngOnInit(): void {
    this.usuarioActual = this.usuarioServicio.obtenerUsuarioDeLocalStorage();
    this.establecerFechaMinima();
  }

  onSubmit() {
    if (this.usuarioActual === undefined) {
      return;
    }
    const quedada: Quedada = {
      lugar: this.formPlanificarQuedada.get('lugar')?.value,
      descripcion: this.formPlanificarQuedada.get('descripcion')?.value,
      fechaHora: this.formPlanificarQuedada.get('fechaHora')?.value,
      estado: this.formPlanificarQuedada.get('estado')?.value,
      usuarioOrganizador: this.usuarioActual?.email,
    };
    this.quedadaServicio
      .registrarQuedada(quedada)
      .then(() => {
        this.formPlanificarQuedada.reset();
        this.notificacionesServicio.mostrarNotificacion("¡Quedada planificada!", "La quedada ha sido registrada con exito", 'success');
        this.router.navigate(['/quedadas/listado-quedadas']);
      });
  }
  private establecerFechaMinima() {
    const diaDeMañana = new Date();
    diaDeMañana.setDate(diaDeMañana.getDate() + 1);
    const mañanaFormateada = diaDeMañana.toISOString().slice(0, 10);
    this.fechaMinima = mañanaFormateada + 'T00:00';
  }
}
