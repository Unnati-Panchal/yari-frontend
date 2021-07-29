import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ResellerComplaintsComponent } from './reseller-complaints.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('ResellerComplaintsComponent', () => {
  let component: ResellerComplaintsComponent;
  let fixture: ComponentFixture<ResellerComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResellerComplaintsComponent],
      providers: [
        { provider: Location, useValue: {} },
        provideMockStore()
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResellerComplaintsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
