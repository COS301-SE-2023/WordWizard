import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAgreementPage } from './user-agreement.page';
import { IonicModule } from '@ionic/angular';
import { SharedUiModule } from '../../../shared-ui/src';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserAgreementPage', () => {
  let component: UserAgreementPage;
  let fixture: ComponentFixture<UserAgreementPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        SharedUiModule,
        RouterTestingModule
      ],
      declarations: [UserAgreementPage],

    }).compileComponents();

    fixture = TestBed.createComponent(UserAgreementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
