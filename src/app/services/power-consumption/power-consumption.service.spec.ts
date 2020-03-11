import { TestBed } from '@angular/core/testing';

import { PowerConsumptionService } from './power-consumption.service';

describe('PowerConsumptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PowerConsumptionService = TestBed.get(PowerConsumptionService);
    expect(service).toBeTruthy();
  });
});
