import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResellerComplaintsComponent } from './reseller-complaints.component';

describe('ResellerComplaintsComponent', () => {
  let component: ResellerComplaintsComponent;
  let fixture: ComponentFixture<ResellerComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResellerComplaintsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResellerComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
