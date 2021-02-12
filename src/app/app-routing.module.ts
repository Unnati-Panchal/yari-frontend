import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '@yaari/guards/auth.guard';

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
  {path: '', pathMatch: 'full', redirectTo: 'auth/login'},
  {path: '**', redirectTo: 'auth/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
