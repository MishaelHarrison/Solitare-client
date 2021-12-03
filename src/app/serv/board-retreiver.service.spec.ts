import { TestBed } from '@angular/core/testing';

import { BoardManagerService } from './board-retreiver.service';

describe('BoardRetreiverService', () => {
  let service: BoardManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
