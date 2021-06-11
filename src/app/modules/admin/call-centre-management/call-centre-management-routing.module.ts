import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ManageQueriesComponent} from '~admin/call-centre-management/components/manage-queries/manage-queries.component';
import {ManageComplaintsComponent} from '~admin/call-centre-management/components/manage-complaints/manage-complaints.component';
import {ViewDetailsComponent} from '~admin/call-centre-management/components/view-details/view-details.component';
import {CallCentreManagementComponent} from '~admin/call-centre-management/components/call-centre-management/call-centre-management.component';
import {ManageQueriesDetailComponent} from '~admin/call-centre-management/components/manage-queries/manage-queries-detail/manage-queries-detail.component';
import {ManageComplaintsDetailComponent} from '~admin/call-centre-management/components/manage-complaints/manage-complaints-detail/manage-complaints-detail.component';
import {ViewDetailsDetailComponent} from '~admin/call-centre-management/components/view-details/view-details-detail/view-details-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CallCentreManagementComponent
  },
  {
    path: 'manage-queries',
    children: [
      {
        path: '',
        component: ManageQueriesComponent,
      },
      {
        path: 'detail',
        component: ManageQueriesDetailComponent,
      }
    ]
  },
  {
    path: 'manage-complaints',
    children: [
      {
        path: '',
        component: ManageComplaintsComponent,
      },
      {
        path: 'detail',
        component: ManageComplaintsDetailComponent,
      }
    ]
  },
  {
    path: 'view-details',
    children: [
      {
        path: '',
        component: ViewDetailsComponent,
      },
      {
        path: 'detail',
        component: ViewDetailsDetailComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CallCentreManagementRoutingModule { }
