import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewChildPage } from './view-child.page';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngxs/store';

describe('ViewChildPage', () => {
  let component: ViewChildPage;
  let fixture: ComponentFixture<ViewChildPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      declarations: [ViewChildPage],
      providers: [Store],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewChildPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
