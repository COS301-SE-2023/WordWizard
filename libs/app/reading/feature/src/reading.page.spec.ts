import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ReadingPage } from './reading.page';
import { NgxsModule, Store } from '@ngxs/store';
import { ReadingState, ReadingService, Word } from '@word-wizard/app/reading/data-access';
import { ReadingSharedUiModule } from '@word-wizard/app/reading/shared-ui';
import { SharedUiModule } from '@word-wizard/app/shared-ui';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Observable, of } from 'rxjs';
import { ReadingStateModel } from '@word-wizard/app/reading/data-access';

describe('ReadingPage', () => {
  let component: ReadingPage;
  let fixture: ComponentFixture<ReadingPage>;
  let store: Store;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ReadingPage],
      imports: [
        IonicModule.forRoot(),
        NgxsModule.forRoot([ReadingState]),
        HttpClientModule,
        SharedUiModule,
        ReadingSharedUiModule,
        BrowserModule,
        HttpClientTestingModule,
      ],
      providers: [ReadingService],
    }).compileComponents();

    const mockRecognition = {
      start: jest.fn(),
      stop: jest.fn(),
      addEventListener: jest.fn(),
    };
    (window as any).webkitSpeechRecognition = jest.fn().mockImplementation(() => mockRecognition);

    fixture = TestBed.createComponent(ReadingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(Store);
    jest.spyOn(store, 'dispatch'); 
    const mockReadingState$ = of({
      Passage: {
        model: {
          Content: {
            passage: [],
            focusWordsIndex: [],
            done: false,
          },
          Word: {
            current: 0, 
            attemptsRemaining: 3,
          },
        },
      },
    } as ReadingStateModel);
    jest.spyOn(store, 'select').mockReturnValue(mockReadingState$); 

    fixture.detectChanges();
  }));

  it('should create the ReadingPage', () => {
    expect(component).toBeTruthy();
  });

  it('should set currentWord value from getCurrent$ observable', () => {
    expect(component.currentWord).toBe(0); 
  });

  it('should update progressPercentage when readingState changes', () => {
    const progressPercentage = '33%';
    component.progressPercentage = progressPercentage;
    const newReadingStateModel: ReadingStateModel = {
      Passage: {
        model: {
          Content: {
            passage: [],
            focusWordsIndex: [],
            done: true,
          },
          Word: {
            current: 2,
            attemptsRemaining: 0,
          },
        },
      },
    };
    const mockReadingState$ = of(newReadingStateModel); 
    jest.spyOn(store, 'select').mockReturnValue(mockReadingState$); 
    fixture.detectChanges();
    expect(component.progressPercentage).toBe('33%');
  });

  it('should return "green" when word.correct is true', () => {
    const word: Word = { word: 'Test', imageURL: null, correct: true };
    const color = component.getWordColor(word);
    expect(color).toEqual('green');
  });

  it('should return "red" when word.correct is false', () => {
    const word: Word = { word: 'Test', imageURL: null, correct: false };
    const color = component.getWordColor(word);
    expect(color).toEqual('red');
  });

  it('should return "white" when word is null', () => {
    const word: Word | null = null;
    const color = component.getWordColor(word);
    expect(color).toEqual('white');
  });

  it('should return "white" when word is undefined', () => {
    const word: Word | undefined = undefined;
    const color = component.getWordColor(word);
    expect(color).toEqual('white');
  });

  it('should return "white" when word.correct is undefined', () => {
    const word: Word = { word: 'Test', imageURL: null, correct: null };
    const color = component.getWordColor(word);
    expect(color).toEqual('white');
  });
});
