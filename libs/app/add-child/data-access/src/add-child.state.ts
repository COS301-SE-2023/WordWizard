import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
// import { Word } from './interfaces/library.interfaces';
import { AddChild, GetProfilePictures } from './add-child.actions';
// import { VocabRequest, PracticeRequest, UpdateRequest } from './requests/library.requests';
import { AddChildService } from './add-child.service';
import { produce } from 'immer';

export interface AddChildStateModel {
  addChild: {
    model:{
      ProfilePictures:{
        pictures: string[]
      }
    };
  }
}

@State<AddChildStateModel>({
  name: 'library',
  defaults: {
    addChild: {
      model: {
        ProfilePictures: {
          pictures: []
        }
      }
    }
  }
})

@Injectable()
export class AddChildState {

  constructor(
    private readonly store: Store,
    private readonly addChildService: AddChildService
  ){}

  // @Action(Example)
  // example(ctx: StateContext<ReadingStateModel>, action: Example) {
  //   const request = {
  //     word: this.word,
  //     definition: 'A fruit that grows on trees'
  //   } as ReadingRequest;

  //   this.readingService.getVocab(request).subscribe((data) => {
  //     console.log(data);
  //   });
  // }

  @Action(AddChild)
  AddChild(ctx: StateContext<AddChildStateModel>, {payload}:AddChild) {
    //
  }

  @Action(GetProfilePictures)
  GetProfilePictures(ctx: StateContext<AddChildStateModel>) {
    //
  }

  @Selector()
  static practice(state: AddChildState) {
    // return state.addChild.model.ProfilePictures.pictures;
  }

  @Selector()
  static vocab(state: AddChildState) {
    // return state.Library.model.Vocab;
  }
}

