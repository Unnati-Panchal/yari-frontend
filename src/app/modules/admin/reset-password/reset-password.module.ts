import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SharedModule } from '@yaari/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    SharedModule,
    ResetPasswordRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ]
})
export class ResetPasswordModule { }
