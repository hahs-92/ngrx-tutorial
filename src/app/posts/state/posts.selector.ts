import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './posts.state';

export const POSTS_STATE_NAME = 'posts';

const getPostsState = createFeatureSelector<PostsState>(POSTS_STATE_NAME);

export const getPosts = createSelector(getPostsState, (state) => {
  return state.posts;
});

// ---------DEPRECADO----------
// export const getPostById = createSelector(
//   getPostsState,
//   (state: PostsState, props: any) => {
//     return state.posts.find((post) => post.id === props.id);
//   }
// );
export const getPostById = (props: { id: string }) =>
  createSelector(getPostsState, (state: PostsState) => {
    return state.posts.find((post) => post.id === props.id);
  });
