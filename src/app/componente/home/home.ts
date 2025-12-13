
// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule }    from '@angular/material/icon';
import { MatButtonModule }  from '@angular/material/button';

import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterLink, // para usar routerLink no template
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {}






