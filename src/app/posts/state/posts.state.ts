import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Post } from '../../models/posts.models';

//para trabajar con ngEntity extendemos de EntityState
export interface PostsState extends EntityState<Post> {
  //con ngEntity no agregamos esta lista
  //posts: Post[];
}

//ng-entity
export const postsAdapter = createEntityAdapter<Post>();

//CON GN-ENTITY
export const initialState: PostsState = postsAdapter.getInitialState();

//SIN NG-ENTITY
// export const initialState: PostsState = {
//   posts: [],
// };

// --------------------------------------------------
//
//
//de la forma tradicional
// posts = [{ id: 1, post1 }, { id: 2, post2 }, , { id: 3, post3 }];

//con ngEntities
// posts = {
//  ids: [1,2,3],
//  entities: {1: post1, 2:post2, 3: post3}
//}

// de esta manera si necesitamos un post en particular
//no necesitamos recorer todo el arreglo, si no lo hacemos
//de la siguiente manera:

// posts['entities'][2]
