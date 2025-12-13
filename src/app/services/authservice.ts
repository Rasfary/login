import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router)
  private http = inject(HttpClient);
  apiUrl = 'http://localhost:3000';
  login(email: string, senha: string): Observable<boolean> {
    //return this.http.get<any[]>(`http://localhost:3000/usuarios?email=${email}&senha=${senha}`)
    return this.http.get<any[]>(`http://localhost:3000/usuario?email=${email}&senha=${senha}`)
    .pipe(
        map(usuarios => {
          if (usuarios.length > 0) {
            localStorage.setItem('token', 'token-valido-123');
            return true;
          }
          return false;
        })
      )
  }
logout() {
  localStorage.removeItem('token')
  this.router.navigate(['/login']);
}
estaLogado(): boolean {
  return !!localStorage.getItem('token')
}
register(usuario: any): Observable<any> {
return this.http.post<any>(`${this.apiUrl}/usuario`, usuario);
}
}