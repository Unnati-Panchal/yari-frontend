import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DashboardRoutingModule} from '~platform/dashboard/dashboard-routing.module';

import {DashboardComponent} from '~platform/dashboard/components/dashboard/dashboard.component';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ]
})
export class DashboardModule { }
