import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressPotionComponent } from './progress-potion.component';

describe('ProgressPotionComponent', () => {
  let component: ProgressPotionComponent;
  let fixture: ComponentFixture<ProgressPotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressPotionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressPotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the ProgressPotionComponent', () => {
    expect(component).toBeTruthy();
  });


});
