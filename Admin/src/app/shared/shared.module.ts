import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import {ButtonModule} from 'primeng/button';
import { AddUserComponent } from './add-user/add-user.component';
import { BlockUserComponent } from './block-user/block-user.component';
import {InputSwitchModule} from 'primeng/inputswitch';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AddUserComponent,
    BlockUserComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ButtonModule,
    InputSwitchModule,
    DialogModule,
    ToastModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AddUserComponent,
    BlockUserComponent,
  ],
  providers: [MessageService]
})
export class SharedModule { }
