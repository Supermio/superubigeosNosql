import { TestBed } from '@angular/core/testing';

import { BaseConfigService } from './base-config.service';

describe('BaseConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaseConfigService = TestBed.get(BaseConfigService);
    expect(service).toBeTruthy();
  });
});
