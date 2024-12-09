import { TestBed } from '@angular/core/testing';

import { RescuesDataService } from '../services/rescues-data.service';

describe('RescuesDataService', () => {
  let service: RescuesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RescuesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
