import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {CurrentUserInterface, CurrentUserRequestInterface} from './../../shared/types/';
import {RegisterRequestInterface, LoginRequestInterface, AuthResponseInterface} from './../types/';
import {Observable, map} from 'rxjs';
import {environment} from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<CurrentUserInterface> {
    const url = `${this.apiUrl}/user`;

    return this.http.get<AuthResponseInterface>(url).pipe(map(this.getUser));
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = `${this.apiUrl}/users`;

    return this.http.post<AuthResponseInterface>(url, data).pipe(map(this.getUser));
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = `${this.apiUrl}/users/login`;

    return this.http.post<AuthResponseInterface>(url, data).pipe(map(this.getUser));
  }

  getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user;
  }

  updateCurrentUser(currentUserRequest: CurrentUserRequestInterface): Observable<CurrentUserInterface> {
    const url = `${this.apiUrl}/user`;

    return this.http.put<AuthResponseInterface>(url, currentUserRequest).pipe(map(this.getUser));
  }
}
