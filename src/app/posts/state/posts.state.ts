import { Post } from '../../models/posts.models';

export interface PostsState {
  posts: Post[];
}

export const initialState: PostsState = {
  posts: [],
};
