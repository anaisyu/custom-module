import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DySwiperComponent} from './dy-swiper.component';

describe('DySwiperComponent', () => {
  let component: DySwiperComponent;
  let fixture: ComponentFixture<DySwiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DySwiperComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DySwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
