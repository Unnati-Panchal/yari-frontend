import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeReturnComponent } from './exchange-return.component';

describe('ExchangeReturnComponent', () => {
  let component: ExchangeReturnComponent;
  let fixture: ComponentFixture<ExchangeReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExchangeReturnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
