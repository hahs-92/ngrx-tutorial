import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostsService } from '../services/posts.service';
import {
  loadPosts,
  loadPostsSuccess,
  addPost,
  addPostSuccess,
  updatePost,
  deletePost,
  deletePostSuccess,
} from './posts.actions';
import {
  tap,
  mergeMap,
  map,
  switchMap,
  filter,
  withLatestFrom,
  of,
} from 'rxjs';
import { updatePostSuccess } from './posts.actions';
import { Post } from '../../models/posts.models';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { getPosts } from './posts.selector';
import {
  RouterNavigatedAction,
  RouterNavigationAction,
  ROUTER_NAVIGATION,
} from '@ngrx/router-store';

@Injectable()
export class PostsEffects {
  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private store: Store<AppState>
  ) {}

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPosts),
      mergeMap((action) =>
        this.postsService.getPosts().pipe(
          map((posts) => {
            return loadPostsSuccess({ posts });
          })
        )
      )
    )
  );

  addPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addPost),
      mergeMap((action) =>
        this.postsService.addPost(action.post).pipe(
          map((data) => {
            const post = { ...action.post, id: data.name };
            return addPostSuccess({ post });
          })
        )
      )
    )
  );

  updatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePost),
      switchMap((action) =>
        this.postsService.updatePost(action.post).pipe(
          map((data) => {
            // SIN ENTITY
            // return updatePostSuccess({ post: action.post });

            //CON ENETITY
            const updatedPost: Update<Post> = {
              id: action.post.id!,
              changes: { ...action.post },
            };
            return updatePostSuccess({ post: updatedPost });
          })
        )
      )
    )
  );

  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePost),
      switchMap((action) =>
        this.postsService.deletePost(action.postId).pipe(
          map((data) => {
            return deletePostSuccess({ postId: action.postId });
          })
        )
      )
    )
  );

  getSinglePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction) => {
        return r.payload.routerState.url.startsWith('/posts/details');
      }),
      map((r: any) => {
        return r.payload.routerState['params']['id'];
      }),
      switchMap((id: string) => {
        return this.postsService.getPostById(id).pipe(
          map((post) => {
            const postData = [{ ...post, id }];
            return loadPostsSuccess({ posts: postData });
          })
        );
      })

      //SI EL POST ESTA EN EL STORE NO SE HACE UN LLAMADO A LA API
      //PODEMOS HACER ALGO PARECIDO PARA LOADPOSTS
      //AUNQUE SE INTRODUCIRIAN ALGUNOS BUGS
      // withLatestFrom(this.store.select(getPosts)),
      // switchMap(([id, posts]) => {
      //   if (!posts.length) {
      //     return this.postsService.getPostById(id).pipe(
      //       map((post) => {
      //         const postData = [{ ...post, id }];
      //         return loadPostsSuccess({ posts: postData });
      //       })
      //     );
      //   }

      //   return of(loadPostsSuccess({ posts: posts }));
      // })
    )
  );
}
