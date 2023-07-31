import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadingPage } from './reading.page';
import { NgxsModule } from '@ngxs/store';
import { ReadingModule } from './reading.module';
import { ActivatedRoute } from '@angular/router';
import { Word } from '@word-wizard/app/reading/data-access';

describe('ReadingPage', () => {
  let component: ReadingPage;
  let fixture: ComponentFixture<ReadingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([]), ReadingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1',
              },
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return "green" when word.correct is true', () => {
    const word: Word = { word: 'test', imageURL: '', correct: true };
    expect(component.getWordColor(word)).toEqual('green');
  });

  it('should return "red" when word.correct is false', () => {
    const word: Word = { word: 'test', imageURL: '', correct: false };
    expect(component.getWordColor(word)).toEqual('red');
  });

  it('should return "white" when word is null or undefined', () => {
    expect(component.getWordColor(null)).toEqual('white');
    expect(component.getWordColor(undefined)).toEqual('white');
  });
});
