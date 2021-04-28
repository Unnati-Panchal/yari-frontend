import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminAuthGuard, AuthGuard} from '@yaari/guards/auth.guard';
import {TermsAndConditionsComponent} from '~app/modules/terms-and-conditions/terms-and-conditions.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('~auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'app',
    loadChildren: () => import('~platform/platform.module').then(m => m.PlatformModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'supplier-guidelines',
    component: TermsAndConditionsComponent
  },
  {
    path: 'admin',
    loadChildren: () => import('~admin/admin.module').then(m => m.AdminModule),
  },
  {path: '', pathMatch: 'full', redirectTo: 'auth/login'},
  {path: '**', redirectTo: 'auth/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
