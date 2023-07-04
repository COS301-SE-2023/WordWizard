import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageChildrenPage } from './manage-children.page';
import { SharedUiModule } from '@word-wizard/app/shared-ui';

describe('ManageChildrenPage', () => {
  let component: ManageChildrenPage;
  let fixture: ComponentFixture<ManageChildrenPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageChildrenPage, SharedUiModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageChildrenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
