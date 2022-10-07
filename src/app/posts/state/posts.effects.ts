import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostsService } from '../services/posts.service';
import { loadPosts, loadPostsSuccess } from './posts.actions';
import { tap, mergeMap, map } from 'rxjs';

@Injectable()
export class PostsEffects {
  constructor(private actions$: Actions, private PostsService: PostsService) {}

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPosts),
      mergeMap((action) =>
        this.PostsService.getPosts().pipe(
          map((posts) => {
            return loadPostsSuccess({ posts });
          })
        )
      )
    )
  );
}
