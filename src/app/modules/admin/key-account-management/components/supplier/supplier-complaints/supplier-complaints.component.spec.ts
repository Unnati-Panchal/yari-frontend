import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierComplaintsComponent } from './supplier-complaints.component';

describe('SupplierComplaintsComponent', () => {
  let component: SupplierComplaintsComponent;
  let fixture: ComponentFixture<SupplierComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierComplaintsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
