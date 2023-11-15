import { TestBed } from '@angular/core/testing';

import { TranslationClientService } from './translation-client.service';

describe('TranslationClientService', () => {
  let service: TranslationClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslationClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
