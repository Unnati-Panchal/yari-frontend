import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResellerDetailsComponent } from './reseller-details.component';

describe('ResellerDetailsComponent', () => {
  let component: ResellerDetailsComponent;
  let fixture: ComponentFixture<ResellerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResellerDetailsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResellerDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
