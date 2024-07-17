import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DyTitleZoomComponent} from './dy-title-zoom.component';

describe('DyTitleZoomComponent', () => {
  let component: DyTitleZoomComponent;
  let fixture: ComponentFixture<DyTitleZoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DyTitleZoomComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DyTitleZoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
