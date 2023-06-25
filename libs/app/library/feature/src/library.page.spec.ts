import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { LibraryPage } from './library.page';
import { NgxsModule } from '@ngxs/store';
import { LibraryState, LibraryService } from '@word-wizard/app/library/data-access';
import { HttpClientModule } from '@angular/common/http';

describe('LibraryPage', () => {
  let component: LibraryPage;
  let fixture: ComponentFixture<LibraryPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LibraryPage],
      imports: [
        IonicModule.forRoot(),
        NgxsModule.forRoot([LibraryState]),
        HttpClientModule
      ],
      providers: [LibraryService]
    }).compileComponents();

    fixture = TestBed.createComponent(LibraryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the LibraryPage', () => {
    expect(component).toBeTruthy();
  });
});

