import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Usuario } from '../modelo/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private auth: Auth) { }

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
        console.log("Usuario eliminado correctamente de la autenticación de firebase.");
      }
    } catch (error) {
      console.error("Error al eliminar usuario de la autenticación de firebase:", error);
    }
  }
  
}
