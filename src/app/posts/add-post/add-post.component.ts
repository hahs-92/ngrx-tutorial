import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Post } from '../../models/posts.models';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { addPost } from '../state/posts.actions';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  postForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(6)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {}

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

  onAddPost() {
    if (this.postForm.invalid) {
      return;
    }

    const newPost: Post = {
      title: this.postForm.value.title!,
      description: this.postForm.value.description!,
    };

    this.store.dispatch(addPost({ post: newPost }));

    this.postForm.reset();
  }
}
