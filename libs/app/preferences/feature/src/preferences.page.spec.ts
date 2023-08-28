import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreferencesPage } from './preferences.page';
import { HeaderModule, ButtonModule } from '@word-wizard/app/shared-ui';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

describe('PreferencesPage', () => {
  let component: PreferencesPage;
  let fixture: ComponentFixture<PreferencesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HeaderModule, ButtonModule, IonicModule, FormsModule ],
      declarations: [PreferencesPage],
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

    fixture = TestBed.createComponent(PreferencesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
