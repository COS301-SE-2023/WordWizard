import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Action,
  Selector,
  State,
  StateContext,
  Store,
  Select,
} from '@ngxs/store';
import {
  SetPassage,
  MakeAttempt,
  UpdateProgress,
  SetStatus,
  ResetPassage,
} from './reading.actions';
import { ChildState, Child } from '@word-wizard/app/child/data-access';
import { Observable } from 'rxjs';
import { produce } from 'immer';
import {
  PassageRequest,
  UpdateProgressRequest,
} from './requests/reading.request';
import { Word, Content } from './interfaces/reading.interfaces';
import { ReadingService } from './reading.service';
import { StageState } from '@word-wizard/app/stage/data-access';

export interface ReadingStateModel {
  Passage: {
    model: {
      Content: {
        passage: Word[];
        focusWordsIndex: number[];
        done: boolean;
      };
      Word: {
        current: number;
        attemptsRemaining: number;
      };
      level: number;
      status: boolean;
      //Fair enough
    };
  };
}

@State<ReadingStateModel>({
  name: 'reading',
  defaults: {
    Passage: {
      model: {
        Content: {
          passage: [],
          focusWordsIndex: [],
          done: false,
        },
        Word: {
          current: 0,
          attemptsRemaining: 2,
        },
        level: 1,
        status: false,
      },
    },
  },
})
@Injectable()
export class ReadingState {
  @Select(ChildState.currentChild) currentChild$!: Observable<Child>;
  @Select(StageState.getSelectedStage) getSelectedStage$!: Observable<number>;

  constructor(
    private readonly readingService: ReadingService,
    private readonly router: Router,
    private readonly store: Store,
  ) {}

  @Action(SetPassage)
  async setPassage(ctx: StateContext<ReadingStateModel>) {
    let lvl!: number;
    this.getSelectedStage$
      .subscribe((data) => {
        lvl = data;
      })
      .unsubscribe();

    const rqst: PassageRequest = {
      level: lvl,
    } as PassageRequest;
    const defaultVal: Content = {
      passage: [],
      focusWordsIndex: [],
      done: false,
    };
    const passage: Content =
      (await this.readingService.getPassage(rqst).toPromise()) ?? defaultVal;
    try {
      ctx.setState(
        produce((draft: ReadingStateModel) => {
          draft.Passage.model.Content.passage = passage.passage;
          draft.Passage.model.Content.focusWordsIndex = passage.focusWordsIndex;
        }),
      );
    } catch (err) {
      console.log(err);
    }
  }

  @Action(MakeAttempt)
  async MakeAttempt(
    ctx: StateContext<ReadingStateModel>,
    { payload }: MakeAttempt,
  ) {
    ctx.setState(
      produce((draft: ReadingStateModel) => {
        const passage = draft.Passage.model.Content.passage;
        const focus = draft.Passage.model.Content.focusWordsIndex;
        const Word = draft.Passage.model.Word;
        const current = Word.current;
        let attemptsRemaining = Word.attemptsRemaining;

        const currentWord = passage[focus[current]];
        attemptsRemaining--;
        if (draft.Passage.model.Content.done) {
          if (attemptsRemaining > 0) {
            const foundIndex = passage.findIndex(
              (word) =>
                word.word.toLowerCase() === payload.newAttempt.toLowerCase(),
            );
            if (foundIndex !== -1) passage[foundIndex].correct = true;
            Word.attemptsRemaining = Word.attemptsRemaining - 1;
            if (passage.every((word) => word.correct !== null)) {
              this.store.dispatch(new UpdateProgress());
            }
          } else {
            this.store.dispatch(new UpdateProgress());
          }
        } else {
          if (
            currentWord.word.toLowerCase() === payload.newAttempt.toLowerCase()
          ) {
            currentWord.correct = true;
            Word.current++;
            Word.attemptsRemaining = 2;
            passage[current].correct = true;
          } else if (attemptsRemaining <= 0) {
            currentWord.correct = false;
            Word.current++;
            Word.attemptsRemaining = 2;
          } else {
            Word.attemptsRemaining = Word.attemptsRemaining - 1;
          }

          if (Word.current === focus.length) {
            Word.attemptsRemaining = 2;
            draft.Passage.model.Content.done = true;
          }
        }
      }),
    );
  }

  @Action(UpdateProgress)
  async updateProgress(ctx: StateContext<ReadingStateModel>) {
    const currentDate: Date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };
    const formattedDate: string = currentDate.toLocaleDateString(
      undefined,
      options,
    );
    ctx.setState(
      produce((draft: ReadingStateModel) => {
        const content = draft.Passage.model.Content.passage;
        const level = draft.Passage.model.level;
        const totalWords = content.length;
        const correctWords = content.filter((word) => word.correct).length;

        const score = (correctWords / totalWords) * 100;

        this.currentChild$
          .subscribe((data) => {
            const rqst: UpdateProgressRequest = {
              child_id: data._id,
              progress: {
                level: level,
                content: content,
                score: score,
                date: `${formattedDate}`,
                incorrect_words: totalWords - correctWords,
              },
            };
            this.readingService.updateProgress(rqst).subscribe((data) => {
              this.store.dispatch(new SetStatus({ status: true }));
            });
          })
          .unsubscribe();
      }),
    );
  }

  @Action(SetStatus)
  async setStatus(
    ctx: StateContext<ReadingStateModel>,
    { payload }: SetStatus,
  ) {
    ctx.setState(
      produce((draft: ReadingStateModel) => {
        draft.Passage.model.status = payload.status;
      }),
    );
  }

  @Action(ResetPassage)
  async resetPassage(ctx: StateContext<ReadingStateModel>) {
    ctx.setState(
      produce((draft: ReadingStateModel) => {
        draft.Passage.model.Content.focusWordsIndex = [];
        draft.Passage.model.Content.passage = [];
        draft.Passage.model.Content.done = false;
        draft.Passage.model.Word.current = 0;
        draft.Passage.model.Word.attemptsRemaining = 2;
        draft.Passage.model.Content.passage.forEach((word) => {
          word.correct = null;
        });
      }),
    );
  }

  @Selector()
  static getReadingState(state: ReadingStateModel) {
    return state.Passage.model.Content;
  }

  @Selector()
  static getCurrent(state: ReadingStateModel) {
    return state.Passage.model.Word.current;
  }

  @Selector()
  static getStatus(state: ReadingStateModel) {
    return state.Passage.model.status;
  }

  @Selector()
  static getAttemptsRemaining(state: ReadingStateModel){
    return state.Passage.model.Word.attemptsRemaining;
  }
}
