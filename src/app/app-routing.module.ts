import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './guard/authentication.guard';
import { AuthorizationGuard } from './guard/authorization.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'user-details/:login',
    loadChildren: () => import('./user-details/user-details.module').then(m => m.UserDetailsModule),
    canActivate: [ AuthenticationGuard ]
  },
  {
    path: 'user-management',
    loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule),
    canActivate: [ AuthenticationGuard, AuthorizationGuard ]
  },
  {
    path: '**',
    loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
