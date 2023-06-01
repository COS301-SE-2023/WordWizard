import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Word } from './interfaces/library.interfaces';
import { SetPractice, SetVocab } from './library.actions';
import { LibraryService } from './library.service';
// import produce from 'immer';

export interface LibraryStateModel {
  Passage: {
    model:{
      Practice:{
        words: Word[]
      },
      Vocab:{
        words: Word[]
      }
    };
  }
}

@State<LibraryStateModel>({
  name: 'reading',
  defaults: {
    Passage: {
      model: {
        Practice: {
          words: []
        },
        Vocab: {
          words: []
        }
      }
    }
  }
})

@Injectable()
export class LibraryState {

  constructor(
      private readonly store: Store,
      private readonly libraryService: LibraryService
    ) {}

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

  @Action(SetPractice)
  setPractice(ctx: StateContext<LibraryStateModel>, action: SetPractice) {
    console.log("Set practice action called");
    const list =
    {
      words:[
      {
        word:"Tiger",
        definition:"a very large solitary cat with a yellow-brown coat striped with black, native to the forests of Asia but becoming increasingly rare",
      },
      {
        word:"Umbrella",
        definition:"a device consisting of a circular canopy of cloth on a folding metal frame supported by a central rod, used as protection against rain",
      },
      {
        word:"Van",
        definition:"a medium-sized motor vehicle, typically without side windows in the rear part, for transporting goods",
      },
      {
        word:"Water",
        definition:"a colourless, transparent, odourless liquid that forms the seas, lakes, rivers, and rain and is the basis of the fluids of living organisms",
      },
      {
        word:"Yellow",
        definition:"of the colour between green and orange in the spectrum, a primary subtractive colour complementary to blue; coloured like ripe lemons or egg yolks",
      },
      {
        word:"Yacht",
        definition:"a medium-sized sailing boat equipped for cruising or racing",
      },
      {
        word:"Zebra",
        definition:"an African wild horse with black-and-white stripes and an erect mane",
      }
    ]}

    // // Set the practice list in the state
    // return ctx.setState(
    //   produce((draft) => {
    //     draft.practice = list;
    //   })
    // );
    
  }

  @Action(SetVocab)
  setVocab(ctx: StateContext<LibraryStateModel>, action: SetVocab) {
    console.log("Set vocab action called");
  }


  @Selector()
  static practice(state: LibraryStateModel) {
    return state.Passage.model.Practice;
  }

  @Selector()
  static vocab(state: LibraryStateModel) {
    return state.Passage.model.Vocab;
  }
}

