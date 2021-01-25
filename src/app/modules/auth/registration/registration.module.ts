import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RegistrationRoutingModule} from '~auth/registration/registration-routing.module';

import {RegistrationComponent} from '~auth/registration/components/registration/registration.component';

import {SharedModule} from '@yaari/shared.module';

@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    SharedModule
  ]
})
export class RegistrationModule { }
