import { Action, createReducer } from '@ngrx/store';
import { AuthState, initialState } from './auth.state';

const _authReducer = createReducer(initialState);

export function AuhtReducer(state: AuthState, action: Action) {
  return _authReducer(state, action);
}
