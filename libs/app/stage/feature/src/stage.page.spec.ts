import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StagePage } from './stage.page';
import { IonicModule } from '@ionic/angular';

describe('StagePage', () => {
  let component: StagePage;
  let fixture: ComponentFixture<StagePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),

      ],
      declarations: [StagePage],
    }).compileComponents();

    fixture = TestBed.createComponent(StagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
