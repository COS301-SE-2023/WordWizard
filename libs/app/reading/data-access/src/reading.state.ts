import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Example } from './reading.actions';

export interface ReadingStateModel {
  test: null;
}

@State<ReadingStateModel>({
  name: 'reading',
})

@Injectable()
export class ReadingState {

}

