import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable} from 'rxjs';

const TOKEN_NAME = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private _jwt: JwtHelperService) {
  }

  public loadSecuredData(): Observable<any> {
    return this.http.get(`${environment.backendUrl}/users/mock`);
  }

  public loginRequest(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.backendUrl}/login`, {
      email: email,
      password: password
    });
  }

  public register(email: string, password: string, image: string) {
    return this.http.post(`${environment.backendUrl}/users`, {
      email: email,
      password: password,
      imageUrl: image
    });
  }

  login(token: string) {
    const decodedToken = this._jwt.decodeToken(token);
    localStorage.setItem(TOKEN_NAME, token);
  }

  logout() {
    localStorage.removeItem(TOKEN_NAME);
  }

  public getToken() {
    return localStorage.getItem(TOKEN_NAME);
  }

  public getUser() {
    return JSON.parse(this._jwt.decodeToken(localStorage.getItem(TOKEN_NAME)).sub);
  }

  public setToken(token: string) {
    localStorage.setItem(TOKEN_NAME, token);
  }

  public isTokenExpired() {
    return this._jwt.isTokenExpired(this.getToken());
  }
}
