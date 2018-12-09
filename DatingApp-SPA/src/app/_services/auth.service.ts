import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt'
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = `${environment.apiUrl}/auth`;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Will update a photo url
   */
  changeMemberPhoto(nextPhotoUrl: string) {
    this.photoUrl.next(nextPhotoUrl)
  }

  /**
   * A logging in method. Will store some token and user to storage
   * @param model contains username and password strings
   */
  login(model: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, model)
      .pipe(
        map((response: any) => {
          const user = response;

          if (user) {
            localStorage.setItem('token', user.token);
            this.decodedToken = this.jwtHelper.decodeToken(user.token);

            localStorage.setItem('user', JSON.stringify(user.user));
            this.currentUser = user.user;

            this.changeMemberPhoto(this.currentUser.photoUrl);
          }
        })
      )
  }

  /**
   * Registers a user
   */
  register(model: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, model);
  }

  /**
   * Checks if someone is logged in.
   */
  loggedIn() {
    const token = localStorage.getItem('token');

    return !this.jwtHelper.isTokenExpired(token);
  }
}
