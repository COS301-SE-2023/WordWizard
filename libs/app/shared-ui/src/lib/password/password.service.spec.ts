import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { PasswordService } from './password.service';

describe('PasswordService', () => {
  let service: PasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports :[HttpClientModule]
    });
    service = TestBed.inject(PasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
