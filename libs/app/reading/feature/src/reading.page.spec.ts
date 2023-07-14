
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadingPage } from './reading.page';
import { NgxsModule } from '@ngxs/store';
import { ReadingModule } from './reading.module';
import { ActivatedRoute } from '@angular/router';

describe('ReadingPage', () => {
  let component: ReadingPage;
  let fixture: ComponentFixture<ReadingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([]),
        ReadingModule
      ],
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
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});