import { TestBed } from '@angular/core/testing';
import { VoiceRecognitionService } from './voice-recognition.service';
import { HttpClientModule } from '@angular/common/http';

describe('VoiceRecognitionService', () => {
  let service: VoiceRecognitionService;
  let mockRecognition: any;

  beforeEach(() => {
    mockRecognition = {
      start: jest.fn(),
      stop: jest.fn(),
      addEventListener: jest.fn(),
    };
    (window as any)['webkitSpeechRecognition'] = jest.fn().mockImplementation(() => mockRecognition);

    TestBed.configureTestingModule({});
    service = TestBed.inject(VoiceRecognitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
 