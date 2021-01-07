import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RegistrationRoutingModule} from '~auth/registration/registration-routing.module';

import {RegistrationComponent} from '~auth/registration/components/registration/registration.component';

@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    CommonModule,
    RegistrationRoutingModule
  ]
})
export class RegistrationModule { }
