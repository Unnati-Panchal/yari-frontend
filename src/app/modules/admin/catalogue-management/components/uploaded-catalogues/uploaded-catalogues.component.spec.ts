import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedCataloguesComponent } from './uploaded-catalogues.component';

describe('UploadedCataloguesComponent', () => {
  let component: UploadedCataloguesComponent;
  let fixture: ComponentFixture<UploadedCataloguesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadedCataloguesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedCataloguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
