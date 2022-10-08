import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/posts.models';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { getPostById } from '../state/posts.selector';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent implements OnInit {
  post$!: Observable<Post | null | undefined>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    //obtenemos el post del store
    //ademas hay un efecto para cuando se navege a esta ruta
    //se llame a la api por este post
    this.post$ = this.store.select(getPostById);
  }
}
