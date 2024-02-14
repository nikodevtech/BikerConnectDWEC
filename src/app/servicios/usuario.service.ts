import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Usuario } from '../modelo/usuario';
import { BaseDatosService } from './base-datos.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private auth: Auth, private baseDatosServicio: BaseDatosService) { }

  registrar(usuario: Usuario){
    return createUserWithEmailAndPassword(this.auth, usuario.email, usuario.password);
  }

  async login(usuario: Usuario){
    return signInWithEmailAndPassword(this.auth, usuario.email, usuario.password);
  }

  logout(){
    return signOut(this.auth);
  }

  obtenerUsuarioActual(){
    return this.auth.currentUser;
  }

  async borrarUsuario(usuario: Usuario){
    try {
      const response = await this.login(usuario);
      const user = response.user; 
      if (user) {
        await deleteUser(user); 
        console.log("Usuario eliminado correctamente de Auth firebase.");
      }
    } catch (error) {
      console.error("Error al eliminar usuario de de Auth firebase:", error);
    }
  }

  guardarUsuarioEnLocalStorage(){

    const user = this.obtenerUsuarioActual();

    let usuario: Usuario;

    this.baseDatosServicio.obtenerPorFiltro("usuarios", "email", user?.email).subscribe(
      (data: Usuario[]) => {
        if(data.length > 0) {
          usuario = data[0];
          console.log('Usuario encontrado:', usuario);
          localStorage.setItem('usuarioActual', JSON.stringify(usuario));
        }
      }
    )

  }

  obtenerUsuarioDeLocalStorage(){
    const usuarioActual = localStorage.getItem('usuarioActual');
    return usuarioActual ? JSON.parse(usuarioActual) : null;
  }
  
}
