import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { SharedUiModule } from '@word-wizard/app/shared-ui';
import { AchievementPage } from './achievement.page';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AchievementPage', () => {
  let component: AchievementPage;
  let fixture: ComponentFixture<AchievementPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AchievementPage ],
      imports: [IonicModule.forRoot(), SharedUiModule, FormsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => 'dummyId' }) 
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AchievementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
