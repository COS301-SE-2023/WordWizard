import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageChildrenPage } from './manage-children.page';
import { IonicModule } from '@ionic/angular';
import { SharedUiModule } from '../../../shared-ui/src';
import { RouterTestingModule } from '@angular/router/testing';

describe('ManageChildrenPage', () => {
  let component: ManageChildrenPage;
  let fixture: ComponentFixture<ManageChildrenPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        SharedUiModule,
        RouterTestingModule
      ],
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
