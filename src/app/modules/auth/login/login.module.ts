import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {LoginRoutingModule} from '~auth/login/login-routing.module';

import {LoginComponent} from '~auth/login/components/login/login.component';

import {SharedModule} from '@yaari/shared.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule
  ]
})
export class LoginModule { }
