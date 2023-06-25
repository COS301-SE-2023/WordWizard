import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ReadingPage } from './reading.page';
import { NgxsModule, Store } from '@ngxs/store';
import { ReadingState, ReadingService } from '@word-wizard/app/reading/data-access';
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

    // Mock webkitSpeechRecognition
    const mockRecognition = {
      start: jest.fn(),
      stop: jest.fn(),
      addEventListener: jest.fn(), // Add this line to mock addEventListener
    };
    (window as any).webkitSpeechRecognition = jest.fn().mockImplementation(() => mockRecognition);

    fixture = TestBed.createComponent(ReadingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(Store);
    jest.spyOn(store, 'dispatch'); // Spy on the dispatch method of the store

    // Mock the readingState$ observable
    const mockReadingState$ = of({
      Passage: {
        model: {
          Content: {
            passage: [],
            focusWordsIndex: [],
            done: false,
          },
          Word: {
            current: 0, // Assuming the current word index is 1
            attemptsRemaining: 3,
          },
        },
      },
    } as ReadingStateModel);
    jest.spyOn(store, 'select').mockReturnValue(mockReadingState$); // Use mockReturnValue instead of and.returnValue

    fixture.detectChanges();
  }));

  it('should create the ReadingPage', () => {
    expect(component).toBeTruthy();
  });

  // integration testing:

  it('should set currentWord value from getCurrent$ observable', () => {
    expect(component.currentWord).toBe(0); // Assuming the current word index is 1
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
    const mockReadingState$ = of(newReadingStateModel); // Update the mock readingState$
    jest.spyOn(store, 'select').mockReturnValue(mockReadingState$); // Spy on the select method and return the updated mock readingState$
    fixture.detectChanges(); // Trigger change detection
    expect(component.progressPercentage).toBe('33%');
  });
});
