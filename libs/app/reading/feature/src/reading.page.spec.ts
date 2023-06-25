import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ReadingPage } from './reading.page';
import { NgxsModule } from '@ngxs/store';
import { ReadingState, ReadingService } from '@word-wizard/app/reading/data-access';
import { ReadingSharedUiModule } from '@word-wizard/app/reading/shared-ui';
import { SharedUiModule } from '@word-wizard/app/shared-ui';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

describe('ReadingPage', () => {
  let component: ReadingPage;
  let fixture: ComponentFixture<ReadingPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ReadingPage],
      imports: [
        IonicModule.forRoot(),
        NgxsModule.forRoot([ReadingState]),
        HttpClientModule,
        SharedUiModule,
        ReadingSharedUiModule,
        BrowserModule
      ],
      providers: [ReadingService]
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
  }));

  it('should create the ReadingPage', () => {
    expect(component).toBeTruthy();
  });
});
