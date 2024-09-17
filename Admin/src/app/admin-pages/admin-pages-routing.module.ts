import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPagesComponent } from './admin-pages.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StorageComponent } from './components/storage/storage.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPagesComponent ,
    children: [
      {
        path: '',
        redirectTo: 'dashboard', 
        pathMatch: 'full' 
      },
      {
      path: 'dashboard',
      component: DashboardComponent
      },
      {
        path: 'user',
        component: UsersComponent,
      },
      {
        path:'storage',
        component: StorageComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPagesRoutingModule { }
