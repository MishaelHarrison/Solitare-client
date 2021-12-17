import { TestBed } from '@angular/core/testing';

import { PileFormatingContextService } from './pile-formating-context.service';

describe('PileFormatingContextService', () => {
  let service: PileFormatingContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PileFormatingContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
