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
   imports: [ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  entrar() {
    if(this.formLogin.valid){
      const email = this.formLogin.get('email')!.value!;
      const senha = this.formLogin.get('senha')!.value!;      
      this.authService.login(email, senha).subscribe(sucesso => {
        if (sucesso){
            this.router.navigate(['/lista']);
      }
      });
    } else {
        this.formLogin.markAllAsTouched();
      }
    }
  }   


