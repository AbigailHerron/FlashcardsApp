import { TestBed } from '@angular/core/testing';

import { CardStackServiceService } from './card-stack-service.service';

describe('CardStackServiceService', () => {
  let service: CardStackServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardStackServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
