import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityScoreCardComponent } from './quality-score-card.component';

describe('QualityScoreCardComponent', () => {
  let component: QualityScoreCardComponent;
  let fixture: ComponentFixture<QualityScoreCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityScoreCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityScoreCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
