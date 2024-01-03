import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomDisplayComponent} from './custom-display.component';

describe('CustomDisplayComponent', () => {
  let component: CustomDisplayComponent;
  let fixture: ComponentFixture<CustomDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomDisplayComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CustomDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
