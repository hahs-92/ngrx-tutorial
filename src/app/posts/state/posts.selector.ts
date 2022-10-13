import { createFeatureSelector, createSelector } from '@ngrx/store';
import { postsAdapter, PostsState } from './posts.state';
import { getCurrentRoute } from '../../store/router/router.selector';
import { RouterStateUrl } from '../../store/router/custom-serializer';
import { Post } from '../../models/posts.models';

export const POSTS_STATE_NAME = 'posts';
const getPostsState = createFeatureSelector<PostsState>(POSTS_STATE_NAME);

//CON ENTITY
export const postsSelectors = postsAdapter.getSelectors();

export const getPosts = createSelector(getPostsState, postsSelectors.selectAll);

export const getPostEntities = createSelector(
  getPostsState,
  postsSelectors.selectEntities
);

//entity + store-router
export const getPostById = createSelector(
  getPostEntities,
  getCurrentRoute,
  (posts, route: RouterStateUrl) => {
    return posts ? posts[route.params['id']] : null;
  }
);

//EN EL CASO QUE POST TUVIERA LA PROPIEDAD LOADING
//DE ESTA FORMA SE OBTENDRIA
//export const getLoading = createSelector(getPostsState, state => state.loading)

//SIN ENTITY
/*

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

*/
