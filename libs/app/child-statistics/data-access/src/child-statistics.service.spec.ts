import { TestBed } from '@angular/core/testing';

import { ChildStatisticsService } from './child-statistics.service';

describe('ChildStatisticsService', () => {
  let service: ChildStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChildStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
