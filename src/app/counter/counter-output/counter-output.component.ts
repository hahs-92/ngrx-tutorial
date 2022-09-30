import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StateCounter } from '../models/state.model';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css'],
})
export class CounterOutputComponent implements OnInit {
  // @Input() counter: number = 0;
  counter$: number = 0;

  constructor(private store: Store<{ counter: StateCounter }>) {}

  ngOnInit(): void {
    this.store.select('counter').subscribe((data) => {
      this.counter$ = data.counter;
    });
  }
}
