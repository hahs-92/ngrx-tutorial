import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, finalize, tap, catchError, of } from 'rxjs';
import {
  autoLogin,
  loginStart,
  loginSuccess,
  signupStart,
  signupSuccess,
} from './auth.actions';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Router } from '@angular/router';
import {
  setLoadingSpinner,
  setErrorMessage,
} from '../../store/shared/shared.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      mergeMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStore(user);
            //cuando se dispatch esta action se ejecutara el otro effect
            return loginSuccess({ user });
          }),
          catchError((err) => {
            const errorMessage = this.authService.getErrorMessage(
              err.error.error.message
            );
            return of(setErrorMessage({ message: errorMessage }));
          }),
          finalize(() => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
          })
        );
      })
    );
  });

  redirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccess, signupSuccess),
        tap((action) => {
          this.store.dispatch(setErrorMessage({ message: '' }));
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false } // le indicamos que no retorne nada
  );

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupStart),
      mergeMap((action) => {
        return this.authService.signup(action.email, action.password).pipe(
          map((data) => {
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStore(user);
            return signupSuccess({ user });
          }),
          catchError((err) => {
            const errorMessage = this.authService.getErrorMessage(
              err.error.error.message
            );
            return of(setErrorMessage({ message: errorMessage }));
          }),
          finalize(() => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
          })
        );
      })
    );
  });

  //ahora se llama junto con el loginRedircet
  // signUpRedirect$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(signupSuccess),
  //       tap((action) => {
  //         this.store.dispatch(setErrorMessage({ message: '' }));
  //         this.router.navigate(['/']);
  //       })
  //     );
  //   },
  //   { dispatch: false } // le indicamos que no retorne nada
  // );

  autoLogin$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(autoLogin),
        tap((action) => {
          const user = this.authService.getUserLocalStorage();
          console.log(user);
        })
      );
    },
    { dispatch: false }
  );
}
