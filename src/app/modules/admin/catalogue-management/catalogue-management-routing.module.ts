import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueManagementComponent } from './components/catalogue-management/catalogue-management.component';

const routes: Routes = [
  {
    path: '',
    component: CatalogueManagementComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogueManagementRoutingModule { }
