import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '@yaari/shared.module';
import {PasswordRecoveryRoutingModule} from '~auth/password-recovery/password-recovery-routing.module';

import {PasswordRecoveryComponent} from '~auth/password-recovery/components/password-recovery/password-recovery.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [PasswordRecoveryComponent],
  imports: [
    CommonModule,
    PasswordRecoveryRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class PasswordRecoveryModule { }
