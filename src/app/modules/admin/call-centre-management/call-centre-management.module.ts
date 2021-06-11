import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageQueriesComponent } from './components/manage-queries/manage-queries.component';
import { ManageComplaintsComponent } from './components/manage-complaints/manage-complaints.component';
import { ViewDetailsComponent } from './components/view-details/view-details.component';
import {SharedModule} from '@yaari/shared.module';
import {PricingManagementRoutingModule} from '~admin/pricing-management/pricing-management-routing-module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {CallCentreManagementRoutingModule} from '~admin/call-centre-management/call-centre-management-routing.module';
import { CallCentreManagementComponent } from './components/call-centre-management/call-centre-management.component';
import { ManageQueriesDetailComponent } from './components/manage-queries/manage-queries-detail/manage-queries-detail.component';



@NgModule({
  declarations: [ManageQueriesComponent, ManageComplaintsComponent, ViewDetailsComponent, CallCentreManagementComponent, ManageQueriesDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    CallCentreManagementRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ]
})
export class CallCentreManagementModule { }
