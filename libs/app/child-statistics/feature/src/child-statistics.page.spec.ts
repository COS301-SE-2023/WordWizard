import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChildStatisticsPage } from './child-statistics.page';

describe('ChildStatisticsPage', () => {
  let component: ChildStatisticsPage;
  let fixture: ComponentFixture<ChildStatisticsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
