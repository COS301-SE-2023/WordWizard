import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddChildPage } from './add-child.page';
import { IonicModule } from '@ionic/angular';
import { SharedUiModule } from '../../../shared-ui/src';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddChildPage', () => {
  let component: AddChildPage;
  let fixture: ComponentFixture<AddChildPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        SharedUiModule,
        RouterTestingModule
      ],
      declarations: [AddChildPage],

    }).compileComponents();

    fixture = TestBed.createComponent(AddChildPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
