import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AuthRoutingModule} from '~auth/auth-routing.module';

import {AuthComponent} from '~auth/auth.component';

import {SharedModule} from '@yaari/shared.module';
import { ContactUsComponent } from './contact-us/contact-us.component';

@NgModule({
  declarations: [AuthComponent, ContactUsComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
