import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyAccountManagementComponent } from './key-account-management.component';

describe('KeyAccountManagementComponent', () => {
  let component: KeyAccountManagementComponent;
  let fixture: ComponentFixture<KeyAccountManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyAccountManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyAccountManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
