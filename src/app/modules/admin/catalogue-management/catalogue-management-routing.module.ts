import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueManagementComponent } from './components/catalogue-management/catalogue-management.component';
import { ApproveRejectComponent } from './components/uploaded-catalogues/approve-reject.component';
import { UploadedCataloguesComponent } from './components/uploaded-catalogues/uploaded-catalogues.component';

const routes: Routes = [
  {
    path: '',
    component: CatalogueManagementComponent
  },
  {
    path: 'catalogues',
    children: [
      {
        path: '',
        component: UploadedCataloguesComponent
      },
      {
        path: 'products',
        component: ApproveRejectComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogueManagementRoutingModule { }
