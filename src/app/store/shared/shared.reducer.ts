import { createReducer, on, Action } from '@ngrx/store';
import { initialState, SharedState } from './shared.state';
import { setLoadingSpinner } from './shared.actions';

const _sharedReducer = createReducer(
  initialState,
  on(setLoadingSpinner, (state, action) => {
    return { ...state, showLoading: action.status };
  })
);

export function SharedReducer(state: any, action: Action) {
  return _sharedReducer(state, action);
}
