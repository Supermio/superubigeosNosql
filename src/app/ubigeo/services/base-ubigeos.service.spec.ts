import { TestBed } from '@angular/core/testing';

import { BaseUbigeosService } from './base-ubigeos.service';

describe('BaseUbigeosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaseUbigeosService = TestBed.get(BaseUbigeosService);
    expect(service).toBeTruthy();
  });
});
