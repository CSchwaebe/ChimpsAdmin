import { TestBed } from '@angular/core/testing';

import { NewCollectionService } from './new-collection.service';

describe('NewCollectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewCollectionService = TestBed.get(NewCollectionService);
    expect(service).toBeTruthy();
  });
});
