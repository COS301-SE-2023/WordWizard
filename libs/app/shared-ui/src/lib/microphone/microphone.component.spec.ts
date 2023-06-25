import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MicrophoneComponent } from './microphone.component';
import { VoiceRecognitionService } from '../voiceRecognition/voice-recognition.service';
import { IonicModule } from '@ionic/angular';

describe('MicrophoneComponent', () => {
  let component: MicrophoneComponent;
  let fixture: ComponentFixture<MicrophoneComponent>;
  let voiceService: VoiceRecognitionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MicrophoneComponent],
      providers: [VoiceRecognitionService],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    const mockRecognition = {
      start: jest.fn(),
      stop: jest.fn(),
      addEventListener: jest.fn(),
    };
    (window as any).webkitSpeechRecognition = jest.fn().mockImplementation(() => mockRecognition);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrophoneComponent);
    component = fixture.componentInstance;
    voiceService = TestBed.inject(VoiceRecognitionService);
    fixture.detectChanges();
  });

  it('should create the MicrophoneComponent', () => {
    expect(component).toBeTruthy();
  });
});
