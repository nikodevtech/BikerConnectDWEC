import { TestBed } from '@angular/core/testing';

import { QuedadaService } from './quedada.service';

describe('QuedadaService', () => {
  let service: QuedadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuedadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
