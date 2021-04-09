import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from '@yaari/guards/auth.guard';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('~admin/login/login.module').then(m => m.LoginModule),
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'forgot-password',
        loadChildren: () => import('~admin/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
      },
      {
        path: 'catalogue-management',
        loadChildren: () => import('~admin/catalogue-management/catalogue-management.module').then(m => m.CatalogueManagementModule),
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'key-account-management',
        loadChildren: () => import('~admin/key-account-management/key-account-management.module').then(m => m.KeyAccountManagementModule),
        canActivate: [AdminAuthGuard]
      },
      { path: '**', redirectTo: '/admin/login'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
