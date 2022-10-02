import { createReducer, on } from '@ngrx/store';
import { addPost, updatePost, deletePost } from './posts.actions';
import { initialState, PostsState } from './posts.state';

const _postsReducer = createReducer(
  initialState,
  on(addPost, (state, action) => {
    let post = { ...action.post };
    post.id = (state.posts.length + 1).toString();
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
  })
);

export function postsReducer(state: PostsState | undefined, action: any) {
  return _postsReducer(state, action);
}
