import { createReducer } from '@ngrx/store';
import { initialState, PostsState } from './posts.state';

const _postsReducer = createReducer(initialState);

export function postsReducer(state: PostsState | undefined, action: any) {
  return _postsReducer(state, action);
}
