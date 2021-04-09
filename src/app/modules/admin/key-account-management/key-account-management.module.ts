import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@yaari/shared.module';
import { KeyAccountManagementComponent } from './components/key-account-management/key-account-management.component';
import { KeyAccountManagementRoutingModule } from './key-account-management-routing.module';

@NgModule({
  declarations: [KeyAccountManagementComponent],
  imports: [
    CommonModule,
    KeyAccountManagementRoutingModule,
    SharedModule,
  ]
})
export class KeyAccountManagementModule { }
