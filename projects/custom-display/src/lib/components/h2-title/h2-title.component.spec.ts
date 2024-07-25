import { ComponentFixture, TestBed } from '@angular/core/testing';

import { H2TitleComponent } from './h2-title.component';

describe('H2TitleComponent', () => {
  let component: H2TitleComponent;
  let fixture: ComponentFixture<H2TitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [H2TitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(H2TitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
