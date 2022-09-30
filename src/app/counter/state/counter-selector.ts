import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from '../models/state.model';

//counter es el nombre asignado en el appModule
const getCounterState = createFeatureSelector<CounterState>('counter');

export const getCounter = createSelector(getCounterState, (state) => {
  return state.counter;
});

export const getChannelName = createSelector(getCounterState, (state) => {
  return state.channelName;
});
