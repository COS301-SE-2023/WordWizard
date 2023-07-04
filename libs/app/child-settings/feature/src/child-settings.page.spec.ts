import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChildSettingsPage } from './child-settings.page';

describe('ChildSettingsPage', () => {
  let component: ChildSettingsPage;
  let fixture: ComponentFixture<ChildSettingsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
