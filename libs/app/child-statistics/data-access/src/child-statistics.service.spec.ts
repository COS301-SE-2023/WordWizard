import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ChildStatisticsService } from './child-statistics.service';
import { StatisticsReq } from './requests/child-statistics.requests';
import { Statistics } from './responses/child-statistics.responses';

describe('ChildStatisticsService', () => {
  let service: ChildStatisticsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ChildStatisticsService]
    });

    service = TestBed.inject(ChildStatisticsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
