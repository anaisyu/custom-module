import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DyTextEditorComponent } from './dy-text-editor.component';

describe('DyTextEditorComponent', () => {
  let component: DyTextEditorComponent;
  let fixture: ComponentFixture<DyTextEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DyTextEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DyTextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
