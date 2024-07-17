import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BlockImgTextComponent} from './block-img-text.component';

describe('BlockImgTextComponent', () => {
  let component: BlockImgTextComponent;
  let fixture: ComponentFixture<BlockImgTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockImgTextComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BlockImgTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
