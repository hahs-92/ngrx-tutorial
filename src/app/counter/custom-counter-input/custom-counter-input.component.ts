import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StateCounter } from '../models/state.model';
import { changeChannelName, customerIncrement } from '../state/counter.actions';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.css'],
})
export class CustomCounterInputComponent implements OnInit {
  value!: number;
  channelName: string = '';

  constructor(private store: Store<{ counter: StateCounter }>) {}

  ngOnInit(): void {
    this.store.select('counter').subscribe((data) => {
      this.channelName = data.channelName;
    });
  }

  onAdd() {
    this.store.dispatch(customerIncrement({ count: this.value }));
  }

  onChangeChannelName() {
    this.store.dispatch(changeChannelName());
  }
}
