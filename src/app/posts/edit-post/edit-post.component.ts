import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { getPostById } from '../state/posts.selector';
import { Post } from '../../models/posts.models';
import { updatePost } from '../state/posts.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit, OnDestroy {
  post!: Post;
  postForm!: FormGroup;
  postSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    //LO REEMPLAZAMOS POR STORE-ROUTER IMPLEMENTATION
    // this.route.paramMap.subscribe((param) => {
    //   const id = param.get('id') || ''
    //   this.postSubscription = this.store
    //     .select(getPostById({ id }))
    //     .subscribe((data) => {
    //       this.post = data!;
    //       this.createForm();
    //     });
    // });
    // __________con router-store------------
    this.createForm();
    this.postSubscription = this.store.select(getPostById).subscribe((post) => {
      if (post) {
        this.post = post!;
        this.postForm.patchValue({
          title: post.title,
          description: post.description,
        });
      }
    });
  }

  createForm() {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(6)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  showDescriptionErrors() {
    const descriptionForm = this.postForm.get('description');
    if (descriptionForm?.touched && !descriptionForm?.valid) {
      if (descriptionForm?.errors?.['required']) {
        return 'Description is required';
      }

      if (descriptionForm.errors?.['minlength']) {
        return 'Description should be of minimun 10 characters';
      }
    }

    return '';
  }

  onUpdatePost() {
    if (this.postForm.invalid) {
      return;
    }

    const title = this.postForm.value.title;
    const description = this.postForm.value.description;

    const post = { id: this.post.id, title, description };

    this.store.dispatch(updatePost({ post }));
    this.router.navigate(['posts']); //se podria implementar en un effect
  }

  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }
}
