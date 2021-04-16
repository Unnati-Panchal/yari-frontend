import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '@yaari/shared.module';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { SuperUserComponent } from './components/super-user/super-user.component';
import { SuperUserRoutingModule } from './super-user-routing.module';

@NgModule({
  declarations: [SuperUserComponent, CreateUserComponent],
  imports: [
    CommonModule,
    SharedModule,
    SuperUserRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class SuperUserModule { }
