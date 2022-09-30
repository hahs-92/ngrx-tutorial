import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './counter.actions';

import { initialState } from './counter.state';
import { StateCounter } from '../models/state.model';

export const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => {
    return { ...state, counter: state.counter + 1 };
  }),
  on(decrement, (state) => {
    return { ...state, counter: state.counter - 1 };
  }),
  on(reset, (state) => initialState)
);

export function counterReducer(state: StateCounter | undefined, action: any) {
  return _counterReducer(state, action);
}
