import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { InfoComponent } from './info.component';

describe('InfoComponent', () => {
  let component: InfoComponent;
  let fixture: ComponentFixture<InfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoComponent],
      imports:[
        IonicModule.forRoot(),
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the InfoComponent', () => {
    expect(component).toBeTruthy();
  });
});
