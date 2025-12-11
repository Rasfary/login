import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './componente/login/login';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
