import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {CurrentUserInterface} from './../../shared/types/';
import {RegisterRequestInterface, LoginRequestInterface, AuthResponseInterface} from './../types/';
import {Observable, map} from 'rxjs';
import {environment} from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<CurrentUserInterface>{
    const url = `${environment.apiUrl}/user`;

    return this.http.get<AuthResponseInterface>(url).pipe(map(this.getUser));
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = `${environment.apiUrl}/users`;

    return this.http.post<AuthResponseInterface>(url, data).pipe(map(this.getUser));
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = `${environment.apiUrl}/users/login`;

    return this.http.post<AuthResponseInterface>(url, data).pipe(map(this.getUser));
  }

  getUser(response:AuthResponseInterface): CurrentUserInterface{
    return response.user;
  }
}
