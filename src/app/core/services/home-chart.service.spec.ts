import { TestBed } from '@angular/core/testing';

import { HomeChartService } from './home-chart.service';

describe('HomeChartService', () => {
  let service: HomeChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
