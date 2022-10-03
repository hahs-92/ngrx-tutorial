import { createAction, props } from '@ngrx/store';
export const SET_LOADING_STATE = '[shared state] set loading spinner';

export const setLoadingSpinner = createAction(
  SET_LOADING_STATE,
  props<{ status: boolean }>()
);
