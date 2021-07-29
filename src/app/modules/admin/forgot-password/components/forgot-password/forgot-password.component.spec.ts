import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminService } from '@yaari/services/admin/admin.service';
import { AppFacade } from '~app/store/app.state';
import { AuthService } from '@yaari/services/auth/auth.service';
import { EMPTY } from 'rxjs';
import { ForgotPasswordComponent } from './forgot-password.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent],
      providers: [
        { provide: AppFacade, useValue: { clearMessages: jest.fn() } },
        { provide: AdminService, useValue: { authorizedAdmin: jest.fn() } },
        { provide: AuthService, useValue: { adminDetails: jest.fn().mockReturnValue(EMPTY) } },
        { provide: MatSnackBar, useValue: {} },
        provideMockStore()
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
