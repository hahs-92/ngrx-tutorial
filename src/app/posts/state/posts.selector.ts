import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './posts.state';
import { getCurrentRoute } from '../../store/router/router.selector';
import { RouterStateUrl } from '../../store/router/custom-serializer';
import { Post } from '../../models/posts.models';

export const POSTS_STATE_NAME = 'posts';

const getPostsState = createFeatureSelector<PostsState>(POSTS_STATE_NAME);

export const getPosts = createSelector(getPostsState, (state) => {
  return state.posts;
});

// ---------DEPRECADO----------
//se realiza como esta abajo
// export const getPostById = createSelector(
//   getPostsState,
//   (state: PostsState, props: any) => {
//     return state.posts.find((post) => post.id === props.id);
//   }
// );

// ------------SE REEMPLAZO POR ROUTER-STORE IMPLEMENTATION---------
// export const getPostById = (props: { id: string }) =>
//   createSelector(getPostsState, (state: PostsState) => {
//     return state.posts.find((post) => post.id === props.id);
//   });

export const getPostById = createSelector(
  getPosts,
  getCurrentRoute,
  (posts: Post[], route: RouterStateUrl) => {
    return posts ? posts.find((post) => post.id === route.params['id']) : null;
  }
);
