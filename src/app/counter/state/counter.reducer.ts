import { createReducer, on } from '@ngrx/store';
import {
  increment,
  decrement,
  reset,
  customerIncrement,
} from './counter.actions';

import { initialState } from './counter.state';
import { StateCounter } from '../models/state.model';
import { changeChannelName } from './counter.actions';

export const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => {
    return { ...state, counter: state.counter + 1 };
  }),
  on(decrement, (state) => {
    return { ...state, counter: state.counter - 1 };
  }),
  on(reset, (state) => initialState),
  on(customerIncrement, (state, action) => {
    return { ...state, counter: state.counter + action.count };
  }),
  on(changeChannelName, (state) => {
    return { ...state, channelName: 'hahs modified' };
  })
);

export function counterReducer(state: StateCounter | undefined, action: any) {
  return _counterReducer(state, action);
}
