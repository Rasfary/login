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

@Component({
  selector: 'app-login',
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(AuthService);

  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  entrar() {
    if(this.formLogin.valid){
      const {email,senha} = this.formLogin.value;
      const sucesso = this.authService.login(email!, senha!);
      if (!sucesso){
        alert('Usuário ou senha incorretos!');
      } else {
        alert('Login realizado com sucesso!');
      }
    }
  }   

}
