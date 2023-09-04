import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { VoiceRecognitionService } from './voice-recognition.service';

describe('VoiceRecognitionService', () => {
  let service: VoiceRecognitionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VoiceRecognitionService],
    });
    service = TestBed.inject(VoiceRecognitionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert speech to text', () => {
    const file = new File([''], 'audio.wav', { type: 'audio/wav' });
    const expectedResponse = { text: 'hello world' };
    service.convertSpeechToText(file).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });
    const req = httpMock.expectOne(
      `${process.env['WW_API_ENDPOINT']}/speech/speech-to-text`,
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body instanceof FormData).toBeTruthy();
    expect(req.request.body.get('file')).toEqual(file);
    req.flush(expectedResponse);
  });
});
