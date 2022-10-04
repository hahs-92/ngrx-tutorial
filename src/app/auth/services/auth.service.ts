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
      default:
        return 'Unknown error ocurred. Please try again!';
    }
  }
}
