import {TestBed} from '@angular/core/testing';

import {DescriptionMetaService} from './description-meta.service';

describe('DescriptionMetaService', () => {
  let service: DescriptionMetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DescriptionMetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
