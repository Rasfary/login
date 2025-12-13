
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/authservice';
// PrimeNG
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-resgister',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,   // IMPORTANTE: necessário para [formGroup] no template
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule
  ],
  templateUrl: './resgister.html',
  styleUrls: ['./resgister.css'],
})
export class Resgister {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Validador opcional para confirmar senha
   private static senhaIgualValidator: ValidatorFn = (group: AbstractControl) => {
    const senha = group.get('senha')?.value;
    const confirmar = group.get('confirmarSenha')?.value;
    if (confirmar === undefined) return null; // se não existir campo confirmarSenha
    return senha && confirmar && senha === confirmar ? null : { passwordMismatch: true };
  };

  // Use os campos que seu template realmente possui (ajuste conforme seu HTML)
  formRegister = new FormGroup(
    {
      email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
      senha: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
      confirmarSenha: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    },
    { validators: Resgister.senhaIgualValidator }
  );

  cadastrar(): void {
    if (this.formRegister.valid) {
      const { email, senha } = this.formRegister.getRawValue();

      this.authService.register({ email, senha }).subscribe({
        next: () => {
          alert('Conta criada com sucesso. Faça o login.');
          this.router.navigate(['/login']);
        },
        error: () => {
          alert('Erro ao criar conta, tente novamente.');
        }
      });
    } else {
      this.formRegister.markAllAsTouched();
    }
  }
}
