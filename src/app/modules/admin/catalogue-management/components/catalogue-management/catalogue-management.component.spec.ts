import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminService } from '@yaari/services/admin/admin.service';
import { AppFacade } from '~app/store/app.state';
import { AuthService } from '@yaari/services/auth/auth.service';
import { CatalogueManagementComponent } from './catalogue-management.component';
import { EMPTY } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';

describe('CatalogueManagementComponent', () => {
  let component: CatalogueManagementComponent;
  let fixture: ComponentFixture<CatalogueManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogueManagementComponent],
      providers: [
        { provide: AppFacade, useValue: { clearMessages: jest.fn() } },
        { provide: AdminService, useValue: { authorizedAdmin: jest.fn() } },
        { provide: AuthService, useValue: { adminDetails: jest.fn().mockReturnValue(EMPTY) } },
        provideMockStore()
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogueManagementComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
