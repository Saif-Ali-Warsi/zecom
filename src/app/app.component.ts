import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { LoaderService } from './core/services/loader.service';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(public loader: LoaderService, private authservice: AuthService, private route: Router) { }


  logout() {
    this.authservice.logout();
    this.route.navigate(['/login'])

  }

  isLoggedIn() {
    return this.authservice.isLoggedIn();
  }
}
