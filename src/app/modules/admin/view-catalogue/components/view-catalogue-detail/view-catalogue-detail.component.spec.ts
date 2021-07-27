import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCatalogueDetailComponent } from './view-catalogue-detail.component';

describe('ViewCatalogueDetailComponent', () => {
  let component: ViewCatalogueDetailComponent;
  let fixture: ComponentFixture<ViewCatalogueDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCatalogueDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCatalogueDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
