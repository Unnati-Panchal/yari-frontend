import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { AdminService } from '@yaari/services/admin/admin.service';
import { CatalogueContentManagementComponent } from './catalogue-content-management.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';

describe('CatalogueContentManagementComponent', () => {
  let component: CatalogueContentManagementComponent;
  let fixture: ComponentFixture<CatalogueContentManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogueContentManagementComponent],
      providers: [
        { provide: AdminService, useValue: { authorizedAdmin: jest.fn() } },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              queryParamMap: {
                has: () => false,
              }
            }
          }
        },
        provideMockStore()
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogueContentManagementComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
