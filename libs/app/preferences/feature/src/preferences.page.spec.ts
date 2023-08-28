import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreferencesPage } from './preferences.page';
import { HeaderModule, ButtonModule } from '@word-wizard/app/shared-ui';
import { HttpClientModule } from '@angular/common/http';
import { PreferencesService } from '@word-wizard/app/preferences/data-access';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ChildState } from '@word-wizard/app/child/data-access';
import { NgxsModule } from '@ngxs/store';

describe('PreferencesPage', () => {
  let component: PreferencesPage;
  let fixture: ComponentFixture<PreferencesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HeaderModule, ButtonModule, IonicModule, FormsModule, HttpClientModule, NgxsModule.forRoot([]) ],
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
        PreferencesService,
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
