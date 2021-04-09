import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '@yaari/shared.module';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';



@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ]
})
export class ForgotPasswordModule { }
