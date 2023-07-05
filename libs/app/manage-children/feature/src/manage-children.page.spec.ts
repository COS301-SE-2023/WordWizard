import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageChildrenPage } from './manage-children.page';
import { SharedUiModule } from '@word-wizard/app/shared-ui';
import { IonicModule } from '@ionic/angular';

describe('ManageChildrenPage', () => {
  let component: ManageChildrenPage;  
  let fixture: ComponentFixture<ManageChildrenPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SharedUiModule, IonicModule.forRoot()],
      declarations: [ManageChildrenPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageChildrenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
