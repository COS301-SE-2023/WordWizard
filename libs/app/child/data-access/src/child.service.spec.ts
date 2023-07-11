import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ChildService } from './child.service';

describe('ChildService', () => {
  let service: ChildService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ChildService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
