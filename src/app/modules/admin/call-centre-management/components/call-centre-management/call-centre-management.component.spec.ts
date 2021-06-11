import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallCentreManagementComponent } from './call-centre-management.component';

describe('CallCentreManagementComponent', () => {
  let component: CallCentreManagementComponent;
  let fixture: ComponentFixture<CallCentreManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallCentreManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallCentreManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
