import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DyPictureComponent} from './dy-picture.component';

describe('DyPictureComponent', () => {
  let component: DyPictureComponent;
  let fixture: ComponentFixture<DyPictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DyPictureComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DyPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
