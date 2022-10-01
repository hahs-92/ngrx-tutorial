import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './posts.state';

const getPostsState = createFeatureSelector<PostsState>('posts');

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
