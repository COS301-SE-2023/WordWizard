import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChildStatisticsPage } from './child-statistics.page';
import { IonicModule } from '@ionic/angular';
import { SharedUiModule } from '../../../shared-ui/src';
import { RouterTestingModule } from '@angular/router/testing';

describe('ChildStatisticsPage', () => {
  let component: ChildStatisticsPage;
  let fixture: ComponentFixture<ChildStatisticsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        SharedUiModule,
        RouterTestingModule
      ],
      declarations: [ChildStatisticsPage],

    }).compileComponents();

    fixture = TestBed.createComponent(ChildStatisticsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
