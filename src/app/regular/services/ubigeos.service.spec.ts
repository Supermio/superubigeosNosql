import { TestBed } from '@angular/core/testing';

import { UbigeosService } from './ubigeos.service';

describe('UbigeosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UbigeosService = TestBed.get(UbigeosService);
    expect(service).toBeTruthy();
  });
});
