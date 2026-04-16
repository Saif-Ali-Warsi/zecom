import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'auth_token';

  private redirectUrl: string | null = null;

  login(username: string, password: string) {
    if (username === 'star' && password === 'admin') {
      const fakeToken = 'my-fake-jwt-token';
      localStorage.setItem(this.tokenKey, fakeToken);
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

  setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }

  getRedirectUrl() {
    return this.redirectUrl;
  }

  clearRedirectUrl() {
    this.redirectUrl = null;
  }


}
