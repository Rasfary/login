import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
 
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router)
 
  login(email: string, senha: string): boolean {
    if(email === 'admin@email.com' && senha === '123456'){
      sessionStorage.setItem('token', 'abc-123-token');
      this.router.navigate(['/home']);
      return true;
    }
    return false
  }
 
  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['/login']);
  }
 
  estaLogado(): boolean {
    return !!sessionStorage.getItem('token')
  }
 
 
}