import {TestBed} from '@angular/core/testing';

import {SwipeManagerService} from './swipe-manager.service';

describe('SwipeManagerService', () => {
  let service: SwipeManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwipeManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
