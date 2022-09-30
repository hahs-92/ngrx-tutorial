import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StateCounter } from '../models/state.model';
import { customerIncrement } from '../state/counter.actions';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.css'],
})
export class CustomCounterInputComponent implements OnInit {
  value!: number;

  constructor(private store: Store<StateCounter>) {}

  ngOnInit(): void {}

  onAdd() {
    this.store.dispatch(customerIncrement({ count: this.value }));
  }
}
