import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from './authguard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth-page/auth-page.module').then(m => m.AuthPageModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin-pages/admin-pages.module').then(m => m.AdminPagesModule),
    canActivate: [AuthguardGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
