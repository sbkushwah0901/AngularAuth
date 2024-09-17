import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPagesRoutingModule } from './admin-pages-routing.module';
import { UsersComponent } from './components/users/users.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StorageComponent } from './components/storage/storage.component';
import { SharedModule } from '../shared/shared.module';
import { AdminPagesComponent } from './admin-pages.component';
import {CalendarModule} from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import {InputSwitchModule} from 'primeng/inputswitch';
import {PaginatorModule} from 'primeng/paginator';
import {TableModule} from 'primeng/table';
import { LottieCacheModule, LottieModule} from "ngx-lottie";
import player from "lottie-web";
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AdminPagesComponent,
    UsersComponent,
    DashboardComponent,
    StorageComponent
  ],
  imports: [
    CommonModule,
    AdminPagesRoutingModule,
    SharedModule,
    DialogModule,
    PaginatorModule,
    TableModule,
    ReactiveFormsModule,
    ToastModule,
    FormsModule,
    CalendarModule,
    InputSwitchModule,
    LottieModule.forRoot({ player: playerFactory }),
    LottieCacheModule.forRoot()
  ],
  providers: [MessageService]
})
export class AdminPagesModule { }
