import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../servicios/usuario.service';
import { Usuario } from '../modelo/usuario';

@Injectable({
  providedIn: 'root'
})
export class guardAdministracionGuard implements CanActivate {

  constructor(
    private usuarioService: UsuarioService, 
    private router: Router,
) {}

  canActivate(){
    this.usuarioService.guardarUsuarioEnLocalStorage();
    const usuarioActual: Usuario | undefined = this.usuarioService.obtenerUsuarioDeLocalStorage();
    if(!usuarioActual) {
      console.log('No hay usuario actual');
      // Si no hay usuario actual, redirige al usuario al inicio de sesión
      this.router.navigate(['/autenticacion/login']);
      return false;
    }
    else{
      if (usuarioActual.rol === 'ROLE_ADMIN') {
        console.log('Acceso permitido');
        return true;
      } else {
        console.log('Acceso denegado');
        this.router.navigate(['/autenticacion/login']);
        return false;
      }
    }
  
  }
}

