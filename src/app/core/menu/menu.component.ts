import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  componenteActual: string | undefined;

  constructor(
    private usuarioService: UsuarioService, private router: Router
    ) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.componenteActual = this.router.url.split('/')[1];
      }
    });
  }


  onClick() {
    this.usuarioService.logout()
      .then(() => {
        this.router.navigate(['']);
      })
      .catch(error => console.log(error));
  }
}
