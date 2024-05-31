import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DyImgComponent} from './dy-img.component';

describe('DyImgComponent', () => {
  let component: DyImgComponent;
  let fixture: ComponentFixture<DyImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DyImgComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DyImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
