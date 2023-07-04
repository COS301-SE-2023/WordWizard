import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChildSettingsPage } from './child-settings.page';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedUiModule } from '@word-wizard/app/shared-ui';

describe('ChildSettingsPage', () => {
  let component: ChildSettingsPage;
  let fixture: ComponentFixture<ChildSettingsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), ReactiveFormsModule, SharedUiModule],
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
