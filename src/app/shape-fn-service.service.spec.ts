import { TestBed } from '@angular/core/testing';

import { ShapeFnServiceService } from './shape-fn-service.service';

describe('ShapeFnServiceService', () => {
  let service: ShapeFnServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShapeFnServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
