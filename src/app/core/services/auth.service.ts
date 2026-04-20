import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private key = 'token';

  login(username: string, password: string): boolean {
    if (username === 'star' && password === 'admin') {
      localStorage.setItem(this.key, 'fake-jwt-token');
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.key);
  }

  getToken() {
    return localStorage.getItem(this.key);
  }

  isLoggedIn() {
    return !!this.getToken();
  }

}
