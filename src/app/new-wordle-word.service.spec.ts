import { TestBed } from '@angular/core/testing';

import { NewWordleWordService } from './new-wordle-word.service';

describe('NewWordleWordService', () => {
  let service: NewWordleWordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewWordleWordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
