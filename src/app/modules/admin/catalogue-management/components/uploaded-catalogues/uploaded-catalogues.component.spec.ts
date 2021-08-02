import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminService } from '@yaari/services/admin/admin.service';
import { AppFacade } from '~app/store/app.state';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UploadedCataloguesComponent } from './uploaded-catalogues.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('UploadedCataloguesComponent', () => {
  let component: UploadedCataloguesComponent;
  let fixture: ComponentFixture<UploadedCataloguesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadedCataloguesComponent],
      providers: [
        { provide: AdminService, useValue: { authorizedAdmin: jest.fn() } },
        { provide: AppFacade, useValue: { clearMessages: jest.fn() } },
        provideMockStore()
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedCataloguesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
