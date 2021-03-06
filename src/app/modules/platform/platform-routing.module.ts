import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PlatformComponent} from '~platform/platform.component';

const routes: Routes = [
  {
    path: '',
    component: PlatformComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('~platform/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'product',
        loadChildren: () => import('~platform/product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('~platform/profile/profile.module').then(m => m.ProfileModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlatformRoutingModule {
}
