import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState, AppState } from '../models/state.model';
import { Subscription, Observable } from 'rxjs';
import { getCounter } from '../state/counter-selector';

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
  // counter$: Observable<CounterState>;
  counter$!: Observable<Number>;

  counterSubscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // this.counter$ = this.store.select('counter');
    this.counter$ = this.store.select(getCounter);

    //con createSelector
    //de esta manera es mas eficiente xq esta subscripcion
    // solo se ejecuta cuando el counter cambie y no channelName
    this.counterSubscription = this.store
      .select(getCounter)
      .subscribe((counter) => {
        this.counter = counter;
      });

    // this.counterSubscription = this.store
    //   .select('counter')
    //   .subscribe((data) => {
    //     this.counter = data.counter;
    //   });
  }

  ngOnDestroy(): void {
    this.counterSubscription.unsubscribe();
  }
}
