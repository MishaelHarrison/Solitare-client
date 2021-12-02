import { TestBed } from '@angular/core/testing';

import { BoardRetreiverService } from './board-retreiver.service';

describe('BoardRetreiverService', () => {
  let service: BoardRetreiverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardRetreiverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
