import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KeyAccountManagementComponent } from './components/key-account-management/key-account-management.component';

const routes: Routes = [
  {
    path: '',
    component: KeyAccountManagementComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KeyAccountManagementRoutingModule { }
