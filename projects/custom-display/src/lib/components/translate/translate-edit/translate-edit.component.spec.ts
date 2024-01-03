import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TranslateEditComponent} from './translate-edit.component';

describe('TranslateEditComponent', () => {
  let component: TranslateEditComponent;
  let fixture: ComponentFixture<TranslateEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TranslateEditComponent]
    });
    fixture = TestBed.createComponent(TranslateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
