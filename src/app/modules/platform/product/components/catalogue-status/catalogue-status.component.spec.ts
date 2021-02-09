import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueStatusComponent } from './catalogue-status.component';

describe('CatalogueStatusComponent', () => {
  let component: CatalogueStatusComponent;
  let fixture: ComponentFixture<CatalogueStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogueStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogueStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
