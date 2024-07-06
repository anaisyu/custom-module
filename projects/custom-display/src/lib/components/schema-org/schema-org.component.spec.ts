import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaOrgComponent } from './schema-org.component';

describe('SchemaOrgComponent', () => {
  let component: SchemaOrgComponent;
  let fixture: ComponentFixture<SchemaOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchemaOrgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchemaOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
