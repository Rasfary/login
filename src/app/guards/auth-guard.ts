import { inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';
import { AuthService } from '../services/authservice';

export const authGuard: CanActivateFn = (route, state) => {
  const authservice = inject(AuthService);
  const router = inject(Router);

  if(authservice.estaLogado()) {
    return true;
  } else {
    alert("Acesso negado! Faça login provideImageKitLoader.");
    router.navigate(['/login']);
    return false;
  }  
};
