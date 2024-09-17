import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminPagesModule } from './admin-pages/admin-pages.module';
import {provideCacheableAnimationLoader, provideLottieOptions } from 'ngx-lottie';
import { AuthPageModule } from './auth-page/auth-page.module';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AdminPagesModule,
    AuthPageModule,
    HttpClientModule,
  ],
  providers: [
    provideLottieOptions({
      player: () => import(/* webpackChunkName: 'lottie-web' */ 'lottie-web'),
    }),
    provideCacheableAnimationLoader()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
