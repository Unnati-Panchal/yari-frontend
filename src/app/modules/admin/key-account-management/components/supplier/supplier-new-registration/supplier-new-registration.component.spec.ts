import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierNewRegistrationComponent } from './supplier-new-registration.component';

describe('SupplierNewRegistrationComponent', () => {
  let component: SupplierNewRegistrationComponent;
  let fixture: ComponentFixture<SupplierNewRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierNewRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierNewRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
