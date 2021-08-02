import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SupplierComplaintsComponent } from './supplier-complaints.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('SupplierComplaintsComponent', () => {
  let component: SupplierComplaintsComponent;
  let fixture: ComponentFixture<SupplierComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupplierComplaintsComponent],
      providers: [
        { provide: Location, useValue: {} },
        provideMockStore()
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierComplaintsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
