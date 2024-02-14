import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guardAdministracionGuard } from './guard-administracion.guard';

describe('guardAdministracionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guardAdministracionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
