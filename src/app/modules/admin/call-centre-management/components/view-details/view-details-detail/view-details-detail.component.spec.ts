import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsDetailComponent } from './view-details-detail.component';

describe('ViewDetailsDetailComponent', () => {
  let component: ViewDetailsDetailComponent;
  let fixture: ComponentFixture<ViewDetailsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDetailsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDetailsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
