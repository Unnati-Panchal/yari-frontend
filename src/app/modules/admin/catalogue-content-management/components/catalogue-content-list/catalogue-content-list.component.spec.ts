import { ActivatedRoute, Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminService } from '@yaari/services/admin/admin.service';
import { AppFacade } from '~app/store/app.state';
import { CatalogueContentListComponent } from './catalogue-content-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';

describe('CatalogueContentListComponent', () => {
  let component: CatalogueContentListComponent;
  let fixture: ComponentFixture<CatalogueContentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogueContentListComponent],
      providers: [
        { provide: AdminService, useValue: { authorizedAdmin: jest.fn() } },
        { provide: AppFacade, useValue: { clearMessages: jest.fn() } },
        { provide: Router, useValue: {} },
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
    fixture = TestBed.createComponent(CatalogueContentListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
