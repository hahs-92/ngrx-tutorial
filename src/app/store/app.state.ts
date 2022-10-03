import { SHARED_STATE_NAME } from './shared/shared.selector';
import { SharedState } from './shared/shared.state';
import { SharedReducer } from './shared/shared.reducer';

export interface AppState {
  [SHARED_STATE_NAME]: SharedState;
  // counter: CounterState;
  // posts: PostsState;
}

export const appReducer = {
  [SHARED_STATE_NAME]: SharedReducer,
  // counter: counterReducer,
  // posts: postsReducer,
};
