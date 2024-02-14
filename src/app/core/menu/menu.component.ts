import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  componenteActual: string | undefined;

  constructor(
    private router: Router, 
    private notificacionesServicio :NotificacionesService
    ) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.componenteActual = this.router.url.split('/')[1];
        if(this.router.url.split('/')[2] !== undefined){
          this.componenteActual = this.router.url.split('/')[1] + '/' + this.router.url.split('/')[2];
        }
      }
    });
  }

  onClick() {
    this.notificacionesServicio.confirmarLogout();
  }
}
