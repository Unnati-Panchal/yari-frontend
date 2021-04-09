import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueStatusByIdComponent } from './catalogue-status-by-id.component';

describe('CatalogueStatusComponent', () => {
  let component: CatalogueStatusByIdComponent;
  let fixture: ComponentFixture<CatalogueStatusByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogueStatusByIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogueStatusByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
