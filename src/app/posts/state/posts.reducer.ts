import { createReducer, on } from '@ngrx/store';
import {
  addPost,
  updatePost,
  deletePost,
  loadPostsSuccess,
  updatePostSuccess,
} from './posts.actions';
import { initialState, postsAdapter, PostsState } from './posts.state';
import { addPostSuccess, deletePostSuccess } from './posts.actions';

const _postsReducer = createReducer(
  initialState,
  on(addPostSuccess, (state, action) => {
    // si tuviera otra propiedad
    // return postsAdapter.addOne(action.post, {...state, loading: false});
    return postsAdapter.addOne(action.post, state);

    //SIN ENTITY
    // let post = { ...action.post };

    // return { ...state, posts: [...state.posts, post] };
  }),
  on(updatePostSuccess, (state, action) => {
    // CON ENTITY
    //NECESITAMOS MODIFICAR EL ACTION Y EL EFECTO
    return postsAdapter.updateOne(action.post, state);

    //SIN ENTITY
    // const updatePosts = state.posts.map((p) => {
    //   return action.post.id === p.id ? action.post : p;
    // });
    // return { ...state, posts: updatePosts };
  }),
  on(deletePostSuccess, (state, action) => {
    return postsAdapter.removeOne(action.postId, state);

    // SIN ENTITY
    // const posts = state.posts.filter((post) => post.id !== action.postId);

    // return { ...state, posts };
  }),
  on(loadPostsSuccess, (state, action) => {
    return postsAdapter.setAll(action.posts, state);

    // SIN ENTITY
    // return {
    //   ...state,
    //   posts: action.posts,
    // };
  })
);

export function postsReducer(state: PostsState | undefined, action: any) {
  return _postsReducer(state, action);
}
