import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
  SetPassage,
  MakeAttempt,
  Content,
  Word,
  SetStatus,
  ReadingState,
  ResetPassage,
} from '@word-wizard/app/reading/data-access';
import { UpdateStage } from '@word-wizard/app/stage/data-access';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import * as confetti from 'canvas-confetti';

@Component({
  selector: 'ww-reading',
  templateUrl: './reading.page.html',
  styleUrls: ['./reading.page.scss'],
})
export class ReadingPage {
  @Select(ReadingState.getReadingState) readingState$!: Observable<Content>;
  @Select(ReadingState.getCurrent) getCurrent$!: Observable<number>;
  @Select(ReadingState.getStatus) getStatus$!: Observable<boolean>;
  @Select(ReadingState.getAttemptsRemaining) getAttemptsRemaining$!: Observable<number>;

  backgroundImage = 'assets/img/CastleBackground.png';
  backButton = 'assets/img/item/backbutton.png';
  fontSize = '1em';
  value = 1;
  visible = false;

  star1 = 'assets/img/item/greystar.png';
  star2 = 'assets/img/item/greystar.png';
  star3 = 'assets/img/item/greystar.png';
  wizardImg = 'assets/img/item/wizzy.png';
  congratularyMessage = 'Well Tried!';

  progressPercentage = '0%';
  increment!: number;
  textFromMicrophone: string[] = ['assets/mp3/add-1.wav'];
  practice!: Content;
  currentWord = 0;
  sentence = '';
  font = false;

  helpText: string[] = ['Click and hold the microphone to speak', 'Click on the speaker to hear the word', 'Your progress is shown in the potion bottle and the amount of attempts you have left is shown in the top left corner'];
  audioSources: string[] = ['assets/mp3/reading1.mp3', 'assets/mp3/reading2.mp3', 'assets/mp3/reading3.mp3'];

  constructor(private store: Store, private router: Router, private toastController: ToastController) {
    this.setStars();
    this.store.dispatch(new SetPassage());
    this.getStatus$.subscribe((data) => {
      this.visible = data;
    });
    this.getCurrent$.subscribe((data) => {
      this.currentWord = data;
    });
    this.readingState$.subscribe((data) => {
      this.practice = data;
      const correctWords = data.passage.filter((word) => word.correct);
      if (correctWords.length !== 0)
        this.progressPercentage = `${(
          (correctWords.length / data.passage.length) *
          100
        ).toFixed(0)}%`;
      if (data.done)
        this.sentence = data.passage.map((word) => word.word).join(' ');
      this.setStars();
    });
  }

  getWordColor(w: Word | null | undefined) {
    if (w) {
      if (w.correct) return 'green';
      else if (w.correct === false) return 'red';
    }
    return 'white';
  }

  handleTextChange(text: string) {
    const words = text.split(' ');
    if (!this.practice.done) {
      if (
        words.includes(
          this.practice.passage[
            this.practice.focusWordsIndex[this.currentWord]
          ].word.toLowerCase(),
        )
      ) {
        this.triggerConfetti();
        setTimeout(
          () =>
            this.store.dispatch(
              new MakeAttempt({
                newAttempt:
                  this.practice.passage[
                    this.practice.focusWordsIndex[this.currentWord]
                  ].word.toLowerCase(),
              }),
            ),
          500,
        );
      } else {
        this.toastController.create({
          message: 'Ooops, Try again!',
          duration: 2000,
          color: 'danger',
          position: 'top',
        }).then((toast) => {
          toast.present();
        });
        this.store.dispatch(new MakeAttempt({ newAttempt: '' }));
      }
    } else {
      this.practice.passage.every((word) => {
        if (words.includes(word.word.toLowerCase())) {
          this.triggerConfetti();
          setTimeout(() => {
            this.store.dispatch(
              new MakeAttempt({ newAttempt: word.word.toLowerCase() }),
            );
            this.setStars();
          }, 250);
        }
        return true;
      });
    }
  }

  triggerConfetti() {
    setTimeout(() => this.shoot(), 0);
    setTimeout(() => this.shoot(), 50);
    setTimeout(() => this.shoot(), 100);
  }

  shoot(): void {
    const config = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 20,
      shapes: ['star'],
      colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'],
    };

    confetti.default({
      ...config,
      particleCount: 40,
      scalar: 1.2,
      shapes: ['star'],
    });

    confetti.default({
      ...config,
      particleCount: 10,
      scalar: 0.75,
      shapes: ['circle'],
    });
  }

  controlModal() {
    this.store.dispatch(new SetStatus({ status: false }));
    this.store.dispatch(new UpdateStage({ stars: this.getStars()}));
    this.store.dispatch(new ResetPassage());
    this.router.navigate(['/stage']);
  }

  getStars() {
    if (this.progressPercentage >= '50%')
      return 1;
    if (this.progressPercentage >= '75%')
      return 2;
    if (this.progressPercentage == '100%')
      return 3;
    return 0;
  }

  setStars() {
    if (this.progressPercentage >= '50%') {
      this.star1 = 'assets/img/item/goldstar.png';
      this.congratularyMessage = 'Well Done!';
    }
    if (this.progressPercentage >= '75%') {
      this.star2 = 'assets/img/item/goldstar.png';
      this.congratularyMessage = 'Great Job!';
    }
    if (this.progressPercentage == '100%') {
      this.star3 = 'assets/img/item/goldstar.png';
      this.congratularyMessage = 'Amazing!';
    }
  }
  // eslint-disable-next-line
  updateFont(event: any) {
    this.value = event.target.value;
    this.fontSize = `${event.target.value}em`;
  }

  show() {
    this.font = !this.font;
  }

  handle() {
    this.store.dispatch(new UpdateStage({ stars: this.getStars()}));
  }
}
