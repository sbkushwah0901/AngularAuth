import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthPageRoutingModule } from './auth-page-routing.module';
import { AuthPageComponent } from './auth-page.component';
import { NgxOtpInputModule } from "ngx-otp-input";
import { LottieCacheModule, LottieModule} from "ngx-lottie";
import player from "lottie-web";
import { FormsModule } from '@angular/forms';
export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [AuthPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    AuthPageRoutingModule,
    NgxOtpInputModule,
    LottieModule.forRoot({ player: playerFactory }),
    LottieCacheModule.forRoot()
  ]
})
export class AuthPageModule { }
