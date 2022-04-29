import { TestBed } from '@angular/core/testing';

import { ShapeListService } from './shape-list.service';

describe('ShapeListService', () => {
  let service: ShapeListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShapeListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
