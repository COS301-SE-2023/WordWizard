import { TestBed } from '@angular/core/testing';

import { ChildSettingsService } from './child-settings.service';

describe('ChildSettingsService', () => {
  let service: ChildSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChildSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
