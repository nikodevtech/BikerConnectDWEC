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

  login(usuario: Usuario){
    return signInWithEmailAndPassword(this.auth, usuario.email, usuario.password);
  }

  logout(){
    return signOut(this.auth);
  }

  obtenerUsuarioActual(){
    return this.auth.currentUser;
  }
  
}
