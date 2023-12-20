import { TestBed } from '@angular/core/testing';

import { DyTextEditorService } from './dy-text-editor.service';

describe('DyTextEditorService', () => {
  let service: DyTextEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DyTextEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
