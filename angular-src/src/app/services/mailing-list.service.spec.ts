import { TestBed } from '@angular/core/testing';

import { MailingListService } from './mailing-list.service';

describe('MailingListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MailingListService = TestBed.get(MailingListService);
    expect(service).toBeTruthy();
  });
});
