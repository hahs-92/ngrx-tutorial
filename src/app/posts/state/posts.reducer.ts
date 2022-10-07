import { createReducer, on } from '@ngrx/store';
import {
  addPost,
  updatePost,
  deletePost,
  loadPostsSuccess,
} from './posts.actions';
import { initialState, PostsState } from './posts.state';
import { addPostSuccess } from './posts.actions';

const _postsReducer = createReducer(
  initialState,
  on(addPostSuccess, (state, action) => {
    let post = { ...action.post };

    return { ...state, posts: [...state.posts, post] };
  }),
  on(updatePost, (state, action) => {
    const updatePosts = state.posts.map((p) => {
      return action.post.id === p.id ? action.post : p;
    });

    return { ...state, posts: updatePosts };
  }),
  on(deletePost, (state, action) => {
    const posts = state.posts.filter((post) => post.id !== action.postId);

    return { ...state, posts };
  }),
  on(loadPostsSuccess, (state, action) => {
    return {
      ...state,
      posts: action.posts,
    };
  })
);

export function postsReducer(state: PostsState | undefined, action: any) {
  return _postsReducer(state, action);
}
