import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../../models/authResponse.model';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  timeoutInterval: any;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`,
      {
        email: email, //test@test.com
        password: password, //123456
        returnSecureToken: true,
      }
    );
  }

  signup(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_API_KEY}`,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }

  formatUser(data: AuthResponse) {
    const user = new User(
      data.email,
      data.idToken,
      data.localId,
      new Date(new Date().getTime() + +data.expiresIn * 1000)
    );

    return user;
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email Not Found';
      case 'INVALID_PASSWORD':
        return 'Invalid Password';
      case 'EMAIL_EXISTS':
        return 'Email Exists already';
      default:
        return 'Unknown error ocurred. Please try again!';
    }
  }

  runTimeoutInterval(user: User) {
    const todaysDate = new Date().getTime();
    const expitationDate = user.expireDate.getTime();

    const timeInterval = expitationDate - todaysDate;

    this.timeoutInterval = setTimeout(() => {
      //logout functionality
    }, timeInterval);
  }

  setUserInLocalStore(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));
    this.runTimeoutInterval(user);
  }

  getUserLocalStorage() {
    const userDataString = localStorage.getItem('userData');
    if (!userDataString) {
      return null;
    }

    const userData = JSON.parse(userDataString);
    const expirationDate = new Date(userData.expirationDate);
    const user = new User(
      userData.email,
      userData.token,
      userData.localId,
      expirationDate
    );

    this.runTimeoutInterval(user);
    return user;
  }
}
