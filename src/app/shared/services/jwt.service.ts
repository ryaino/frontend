import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  token: string = '';
  refresh: string = '';
  decodedToken: JWT | undefined;
  decodedRefresh: JWT | undefined;

  constructor() {}

  setToken(token: string) {
    if (token) {
      this.token = token;
      localStorage.setItem('access_token', token);
    }
  }

  setRefresh(token: string) {
    if (token) {
      this.refresh = token;
      localStorage.setItem('refresh_token', token);
    }
  }

  decodeToken() {
    let accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      this.setToken(accessToken);
    }
    if (this.token) {
      this.decodedToken = jwt_decode(this.token);
    }
  }

  decodeRefresh() {
    let refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      this.setRefresh(refreshToken);
    }
    if (this.refresh) {
      this.decodedRefresh = jwt_decode(this.refresh);
    }
  }

  getDecodedToken() {
    return jwt_decode(this.token);
  }

  getDecodedRefresh() {
    if (this.decodedRefresh) {
      return this.decodedRefresh;
    } else {
      return '';
    }
  }

  getUser() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['x-hasura-user-id'] : null;
  }

  getTokenExpiration() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.exp : null;
  }

  getRefreshExpiration() {
    this.decodeRefresh();
    return this.decodedRefresh ? this.decodedRefresh.exp : null;
  }

  isTokenExpired(): boolean {
    const expiryTime: number | null = this.getTokenExpiration();

    if (expiryTime) {
      return 1000 * expiryTime - new Date().getTime() < 5000;
    } else {
      return true;
    }
  }

  canRefreshToken(): boolean {
    const expiryTime: number | null = this.getRefreshExpiration();

    if (expiryTime) {
      return 1000 * expiryTime > new Date().getTime();
    } else {
      return false;
    }
  }

  removeTokens() {
    this.token = '';
    this.refresh = '';
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}

type JWT = {
  'x-hasura-default-role': string;
  sub: string;
  iss: string;
  'x-hasura-user-id': string;
  exp: number;
  'x-hasura-allowed-roles': [string];
};
