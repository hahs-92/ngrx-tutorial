import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { getPostById } from '../state/posts.selector';
import { Post } from '../../models/posts.models';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  post!: Post;
  postForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      const id = param.get('id') || '';
      // -----DEPRECADO---------
      // this.store.select(getPostById, { id }).subscribe((data) => {
      //   this.post = data!;
      //   this.createForm();
      // });
      this.store.select(getPostById({ id })).subscribe((data) => {
        this.post = data!;
        this.createForm();
      });
    });
  }

  createForm() {
    this.postForm = this.fb.group({
      title: [
        this.post.title || '',
        [Validators.required, Validators.minLength(6)],
      ],
      description: [
        this.post.description || '',
        [Validators.required, Validators.minLength(10)],
      ],
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
    console.log(this.postForm.value);
  }
}
