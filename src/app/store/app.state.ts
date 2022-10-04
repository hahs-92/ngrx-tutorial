import { SHARED_STATE_NAME } from './shared/shared.selector';
import { SharedState } from './shared/shared.state';
import { SharedReducer } from './shared/shared.reducer';
import { AUTH_STATE_NAME } from '../auth/state/auth.selector';
import { AuthState } from '../auth/state/auth.state';
import { AuhtReducer } from '../auth/state/auth.reducer';

export interface AppState {
  [SHARED_STATE_NAME]: SharedState;
  [AUTH_STATE_NAME]: AuthState;
  // counter: CounterState;
  // posts: PostsState;
}

export const appReducer = {
  [SHARED_STATE_NAME]: SharedReducer,
  [AUTH_STATE_NAME]: AuhtReducer,
  // counter: counterReducer,
  // posts: postsReducer,
};
