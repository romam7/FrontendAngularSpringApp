import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  titulo = 'Iniciar sesión';
  usuario: Usuario;

  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
   }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      Swal.fire('Sesión ya existente', `${this.authService.usuario.username} ya estas autenticado`, 'info');
      this.router.navigate(['/clientes']);
    }
  }

  login(): void {
    if (this.usuario.username == null || this.usuario.password == null) {
      Swal.fire('Error login', 'Username o password vacias', 'error');
    }

    this.authService.login(this.usuario).subscribe(
      response => {
        this.authService.guardarToken(response.access_token);
        this.authService.guardarUsuario();

        const usuario = this.authService.usuario;

        this.router.navigate(['/clientes']);
        Swal.fire('Login exitoso', `Hola ${usuario.username} bienvenido.`, 'success');
      },
      error => {
        if (error.status === 400) {
          Swal.fire('Error login', 'Username o password incorrecta', 'error');
        }
      }
    );
  }
}
