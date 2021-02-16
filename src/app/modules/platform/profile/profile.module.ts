import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileRoutingModule} from '~platform/profile/profile-routing.module';
import {PaymentsComponent} from '~platform/profile/components/payments/payments.component';
import {ProfileComponent} from '~platform/profile/components/profile/profile.component';
import { RatingsReviewsComponent } from './components/ratings-reviews/ratings-reviews.component';
import { QualityScoreCardComponent } from './components/quality-score-card/quality-score-card.component';
import { ExchangeReturnComponent } from './components/exchange-return/exchange-return.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatNativeDateModule} from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    PaymentsComponent,
    ProfileComponent,
    RatingsReviewsComponent,
    QualityScoreCardComponent,
    ExchangeReturnComponent,
    MyProfileComponent
  ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatTableModule,
        MatNativeDateModule,
        MatProgressSpinnerModule,
    ]
})
export class ProfileModule {
}
