import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageComplaintsDetailComponent } from './manage-complaints-detail.component';

describe('ManageComplaintsDetailComponent', () => {
  let component: ManageComplaintsDetailComponent;
  let fixture: ComponentFixture<ManageComplaintsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageComplaintsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageComplaintsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
