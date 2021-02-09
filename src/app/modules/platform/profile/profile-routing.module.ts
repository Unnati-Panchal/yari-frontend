import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from '~platform/profile/components/profile/profile.component';
import {PaymentsComponent} from '~platform/profile/components/payments/payments.component';
import {RatingsReviewsComponent} from '~platform/profile/components/ratings-reviews/ratings-reviews.component';
import {QualityScoreCardComponent} from '~platform/profile/components/quality-score-card/quality-score-card.component';
import {ExchangeReturnComponent} from '~platform/profile/components/exchange-return/exchange-return.component';
import {MyProfileComponent} from '~platform/profile/components/my-profile/my-profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: 'payments',
        component: PaymentsComponent
      },
      {
        path: 'rating-and-reviews',
        component: RatingsReviewsComponent
      },
      {
        path: 'quality-score-card',
        component: QualityScoreCardComponent
      },
      {
        path: 'exchange-return',
        component: ExchangeReturnComponent
      },
      {
        path: 'edit',
        component: MyProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
