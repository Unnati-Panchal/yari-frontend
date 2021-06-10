import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueQualityScoreCardComponent } from './catalogue-quality-score-card.component';

const routes: Routes = [
  {
    path: '',
    component: CatalogueQualityScoreCardComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogueQualityScoreCardRoutingModule { }
