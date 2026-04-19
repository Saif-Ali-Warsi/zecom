import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'auth_token';

  login(username: string, password: string): boolean {
    if (username === 'star' && password === 'admin') {
      const token = 'fake-jwt-token';

      localStorage.setItem(this.tokenKey, token);
      return true;
    }

    return false;
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

}
