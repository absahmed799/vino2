import { TestBed } from '@angular/core/testing';

import { ApiVinoService } from './api-vino.service';

describe('ApiVinoService', () => {
  let service: ApiVinoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiVinoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
