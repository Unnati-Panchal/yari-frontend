import { ActivatedRoute, Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminService } from '@yaari/services/admin/admin.service';
import { AppFacade } from '~app/store/app.state';
import { CatalogueProductListComponent } from './catalogue-product-list.component';
import { EMPTY } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';

describe('CatalogueProductListComponent', () => {
  let component: CatalogueProductListComponent;
  let fixture: ComponentFixture<CatalogueProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogueProductListComponent],
      providers: [
        { provide: AdminService, useValue: { authorizedAdmin: jest.fn() } },
        { provide: AppFacade, useValue: { clearMessages: jest.fn() } },
        { provide: Router, useValue: {} },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              queryParamMap: {
                get: () => jest.fn().mockReturnValue(EMPTY),
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
    fixture = TestBed.createComponent(CatalogueProductListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
