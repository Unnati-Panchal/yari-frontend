import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductCatalogueComponent } from './view-product-catalogue.component';

describe('ViewProductCatalogueComponent', () => {
  let component: ViewProductCatalogueComponent;
  let fixture: ComponentFixture<ViewProductCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProductCatalogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
