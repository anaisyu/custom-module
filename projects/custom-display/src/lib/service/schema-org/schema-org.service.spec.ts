import { TestBed } from '@angular/core/testing';

import { SchemaOrgService } from './schema-org.service';

describe('SchemaOrgService', () => {
  let service: SchemaOrgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchemaOrgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
