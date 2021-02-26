import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {LoginRoutingModule} from '~auth/login/login-routing.module';

import {LoginComponent} from '~auth/login/components/login/login.component';

import {SharedModule} from '@yaari/shared.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [LoginComponent],
    imports: [
        CommonModule,
        LoginRoutingModule,
        SharedModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule
    ]
})
export class LoginModule { }
