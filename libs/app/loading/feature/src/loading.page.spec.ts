import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingPage } from './loading.page';

describe('LoadingPage', () => {
  let component: LoadingPage;
  let fixture: ComponentFixture<LoadingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadingPage],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
