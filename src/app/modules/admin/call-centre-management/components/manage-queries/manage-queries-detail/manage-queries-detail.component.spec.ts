import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageQueriesDetailComponent } from './manage-queries-detail.component';

describe('ManageQueriesDetailComponent', () => {
  let component: ManageQueriesDetailComponent;
  let fixture: ComponentFixture<ManageQueriesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageQueriesDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageQueriesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
