export interface AppState {
  counter: CounterState;
}

export interface CounterState {
  counter: number;
  channelName: string;
}
