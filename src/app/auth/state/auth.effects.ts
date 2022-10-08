import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  map,
  mergeMap,
  finalize,
  tap,
  catchError,
  of,
  exhaustMap,
  switchMap,
} from 'rxjs';
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
import { User } from '../../models/user.model';
import { autoLogout } from './auth.actions';
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
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setErrorMessage({ message: '' }));
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStore(user);
            //cuando se dispatch esta action se ejecutara el otro effect
            return loginSuccess({ user, redirect: true });
          }),
          catchError((err) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
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
          if (action.redirect) {
            this.router.navigate(['/']);
          }
        })
      );
    },
    { dispatch: false } // le indicamos que no retorne nada
  );

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupStart),
      exhaustMap((action) => {
        return this.authService.signup(action.email, action.password).pipe(
          map((data) => {
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStore(user);
            return signupSuccess({ user, redirect: true });
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

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      mergeMap((action) => {
        const user: User = this.authService.getUserLocalStorage()!;
        return of(loginSuccess({ user, redirect: false }));
      })
    );
  });

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(autoLogout),
        tap((action) => {
          this.authService.logout();
          this.router.navigate(['auth']);
        })
      ),
    { dispatch: false }
  );
}
