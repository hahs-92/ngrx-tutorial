import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { StateCounter } from '../models/state.model';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css'],
})
export class CounterOutputComponent implements OnInit, OnDestroy {
  // @Input() counter: number = 0;
  counter: number = 0;
  //este observable no es necesario unsubscribe
  //xq estamos usando el pipe async
  counter$: Observable<StateCounter>;

  counterSubscription: Subscription = new Subscription();

  constructor(private store: Store<{ counter: StateCounter }>) {
    this.counter$ = this.store.select('counter');
  }

  ngOnInit(): void {
    this.counterSubscription = this.store
      .select('counter')
      .subscribe((data) => {
        this.counter = data.counter;
      });
  }

  ngOnDestroy(): void {
    this.counterSubscription.unsubscribe();
  }
}
