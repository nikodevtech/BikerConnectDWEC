import { CanActivateFn,ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { UsuarioService } from '../servicios/usuario.service';
import { Router } from '@angular/router';

export const administracionGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  const usuarioActual = usuarioService.obtenerUsuarioDeLocalStorage();

  if(!usuarioActual) {
    console.log('No hay usuario actual en local storage');
    // Si no hay usuario actual, redirige al usuario al inicio de sesión
    router.navigate(['/autenticacion/login']);
    return false;
  }
  else{
    if (usuarioActual.rol === 'ROLE_ADMIN') {
      // Si el usuario actual tiene rol administrador, permite el acceso.
      console.log('Acceso permitido');
      return true;
    } else {
      // Si el usuario actual tiene rol usuario redirige al usuario al inicio de sesión.
      console.log('Acceso denegado');
      router.navigate(['/autenticacion/login']);
      return false;
    }
  }
  
};
