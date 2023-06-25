import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { LibraryPage } from './library.page';
import { NgxsModule, Store } from '@ngxs/store';
import { LibraryState, LibraryService, LibraryStateModel, Word } from '@word-wizard/app/library/data-access';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LibraryPage', () => {
  let component: LibraryPage;
  let fixture: ComponentFixture<LibraryPage>;
  let store: Store;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LibraryPage],
      imports: [
        IonicModule.forRoot(),
        NgxsModule.forRoot([LibraryState]),
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [LibraryService]
    }).compileComponents();

    fixture = TestBed.createComponent(LibraryPage);
    component = fixture.componentInstance;

    store = TestBed.inject(Store);
    jest.spyOn(store, 'dispatch'); // Spy on the dispatch method of the store

    // Mock the readingState$ observable
    const mockLibraryState$ = of({
      Library: {
        model: {
          Practice: {
            words: []
          },
          Vocab: {
            words: []
          }
        }
      }
    } as LibraryStateModel);
    jest.spyOn(store, 'select').mockReturnValue(mockLibraryState$); // Use mockReturnValue instead of and.returnValue


    fixture.detectChanges();
  }));

  it('should create the LibraryPage', () => {
    expect(component).toBeTruthy();
  });

  // integration testing:

  it('should set practiceList and vocabList', () => {
    const vcbTest = {
      word:"Apple",
      defeniton:"Defintion"
    } as Word;
    
    const prtcTest = {
      word:"Bannana",
      defeniton:"Bannana Defintion"
    } as Word;
    
    const newLibraryState = {
      Library: {
        model: {
          Practice: {
            words: [prtcTest]
          },
          Vocab: {
            words: [vcbTest]
          }
        }
      }
    } as LibraryStateModel;
    const mockLibraryState$ = of(newLibraryState); // Update the mock readingState$
    jest.spyOn(store, 'select').mockReturnValue(mockLibraryState$); // Spy on the select method and return the updated mock readingState$
    fixture.detectChanges(); // Trigger change detection
    expect(component.practice[0]).toBe(prtcTest);
  });
})
