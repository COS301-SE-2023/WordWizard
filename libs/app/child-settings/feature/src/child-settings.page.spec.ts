import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChildSettingsPage } from './child-settings.page';
import { IonicModule } from '@ionic/angular';
import { SharedUiModule } from '../../../shared-ui/src';
import { RouterTestingModule } from '@angular/router/testing';

describe('ChildSettingsPage', () => {
  let component: ChildSettingsPage;
  let fixture: ComponentFixture<ChildSettingsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        SharedUiModule,
        RouterTestingModule
      ],
      declarations: [ChildSettingsPage],

    }).compileComponents();

    fixture = TestBed.createComponent(ChildSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
