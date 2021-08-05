import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueQualityScoreCardComponent } from './catalogue-quality-score-card.component';

describe('CatalogueQualityScoreCardComponent', () => {
  let component: CatalogueQualityScoreCardComponent;
  let fixture: ComponentFixture<CatalogueQualityScoreCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogueQualityScoreCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogueQualityScoreCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
