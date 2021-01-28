import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '@yaari/shared.module';
import {PasswordRecoveryRoutingModule} from '~auth/password-recovery/password-recovery-routing.module';

import {PasswordRecoveryComponent} from '~auth/password-recovery/components/password-recovery/password-recovery.component';

@NgModule({
  declarations: [PasswordRecoveryComponent],
  imports: [
    CommonModule,
    PasswordRecoveryRoutingModule,
    SharedModule
  ]
})
export class PasswordRecoveryModule { }
