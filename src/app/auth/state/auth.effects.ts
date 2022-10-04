import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, finalize, tap, catchError, of } from 'rxjs';
import { loginStart, loginSuccess } from './auth.actions';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import {
  setLoadingSpinner,
  setErrorMessage,
} from '../../store/shared/shared.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private authService: AuthService
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      mergeMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          tap(() => {
            this.store.dispatch(setErrorMessage({ message: '' }));
          }),
          map((data) => {
            const user = this.authService.formatUser(data);
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
}
