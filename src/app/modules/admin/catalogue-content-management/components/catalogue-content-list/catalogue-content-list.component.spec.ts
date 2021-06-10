import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueContentListComponent } from './catalogue-content-list.component';

describe('CatalogueContentListComponent', () => {
  let component: CatalogueContentListComponent;
  let fixture: ComponentFixture<CatalogueContentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogueContentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogueContentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
