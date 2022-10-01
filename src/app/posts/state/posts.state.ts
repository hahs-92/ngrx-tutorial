import { Post } from '../../models/posts.models';

export interface PostsState {
  posts: Post[];
}

export const initialState: PostsState = {
  posts: [
    {
      id: '1',
      title: 'Title1',
      description: 'Sample description',
    },
    {
      id: '2',
      title: 'Title2',
      description: 'Sample description2',
    },
  ],
};
