import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { SpeakerComponent } from './speaker.component';
import { SpeakerService } from './speaker.service';
import { HttpClientModule } from '@angular/common/http';

describe('SpeakerComponent', () => {
  let component: SpeakerComponent;
  let fixture: ComponentFixture<SpeakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpeakerComponent],
      imports: [IonicModule.forRoot(), HttpClientModule],
      providers: [SpeakerService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the SpeakerComponent', () => {
    expect(component).toBeTruthy();
  });
});
