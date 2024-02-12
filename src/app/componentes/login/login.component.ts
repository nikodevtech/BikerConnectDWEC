import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formularioLogin: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.formularioLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.usuarioService.login(this.formularioLogin.value)
      .then(response => {
        console.log(response);
        this.router.navigate(['/dashboard']);
      })
      .catch(error => console.log(error));
  }


}
