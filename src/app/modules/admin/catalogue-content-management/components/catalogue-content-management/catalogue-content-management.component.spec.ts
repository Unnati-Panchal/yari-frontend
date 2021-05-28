import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueContentManagementComponent } from './catalogue-content-management.component';

describe('CatalogueContentManagementComponent', () => {
  let component: CatalogueContentManagementComponent;
  let fixture: ComponentFixture<CatalogueContentManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogueContentManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogueContentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
