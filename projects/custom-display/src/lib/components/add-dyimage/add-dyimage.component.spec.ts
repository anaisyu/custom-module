import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddDyimageComponent} from './add-dyimage.component';

describe('AddDyimageComponent', () => {
  let component: AddDyimageComponent;
  let fixture: ComponentFixture<AddDyimageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDyimageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddDyimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
