import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {SharedModule} from '@yaari/shared.module';
import {ResetPasswordRoutingModule} from '~auth/reset-password/reset-password-routing.module';

import {ResetPasswordComponent} from '~auth/reset-password/components/password-recovery/reset-password.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ]
})
export class ResetPasswordModule {
}
