import { RouterModule, Routes } from '@angular/router';

import { AdminAuthGuard } from '@yaari/guards/auth.guard';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';

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
        path: 'reset-password',
        loadChildren: () => import('~admin/reset-password/reset-password.module').then(m => m.ResetPasswordModule),
      },
      {
        path: 'super-user',
        loadChildren: () => import('~admin/super-user/super-user.module').then(m => m.SuperUserModule),
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'catalogue-management',
        loadChildren: () => import('~admin/catalogue-management/catalogue-management.module').then(m => m.CatalogueManagementModule),
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'catalogue-content-management',
        loadChildren: () => import('~admin/catalogue-content-management/catalogue-content-management.module')
        .then(m => m.CatalogueContentManagementModule),
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'view-catalogue',
        loadChildren: () => import('~admin/view-catalogue/view-catalogue.module')
        .then(m => m.ViewCatalogueModule),
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'catalogue-quality-score-card',
        loadChildren: () => import('~admin/catalogue-quality-score-card/catalogue-quality-score-card.module')
        .then(m => m.CatalogueQualityScoreCardModule),
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'key-account-management',
        loadChildren: () => import('~admin/key-account-management/key-account-management.module').then(m => m.KeyAccountManagementModule),
        canActivate: [AdminAuthGuard]
      },
      { path: '**', redirectTo: '/admin/login' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
