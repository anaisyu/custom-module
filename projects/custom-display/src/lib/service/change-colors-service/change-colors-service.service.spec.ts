import { TestBed } from '@angular/core/testing';

import { ChangeColorsService } from './change-colors.service';

describe('ChangeColorsServiceService', () => {
  let service: ChangeColorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeColorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
