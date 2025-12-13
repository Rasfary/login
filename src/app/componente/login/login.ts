
import { Component, inject, NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/authservice';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Tipar os controles como string para evitar 'string | null'
  formLogin = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    senha: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
  });

  entrar() {
    if (this.formLogin.valid) {
      const email = this.formLogin.get('email')!.value as string;
      const senha = this.formLogin.get('senha')!.value as string;

      this.authService.login(email, senha).subscribe({
        next: (sucesso) => {
          if (sucesso) {
            this.router.navigate(['/home']);
          } else {
            // Falha na autenticação: vá para Register
            this.router.navigate(['/register']);
          }
        },
        error: (err) => {
          // Erro também direcione para Register
          console.error('Erro na autenticação:', err);
          this.router.navigate(['/register']);
        },
      });
    } else {
      // Form inválido: vá para Register
      this.router.navigate(['/register']);
    }
  }
}
