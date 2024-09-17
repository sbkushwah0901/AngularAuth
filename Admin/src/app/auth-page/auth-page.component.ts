import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { NgxOtpInputConfig } from 'ngx-otp-input';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {
  options: AnimationOptions = {
    path: "assets/animations/Apple-Hello.json"
    // path: "assets/temp-animations/72544-tick-animation-blue-success-feedback.json"
  };
  public timeLeft: any;
  public showTime: any;
  public interval: any;
  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 6,
    autofocus: true,
    classList: {
      inputBox: 'my-super-box-class',
      input: 'my-super-class',
      inputFilled: 'my-super-filled-class',
      inputDisabled: 'my-super-disable-class',
      inputSuccess: 'my-super-success-class',
      inputError: 'my-super-error-class',
    },
  };
  sentPhoneNumber = false;

  constructor() { }

  ngOnInit(): void {
    // console.log(this.interval)
  }

  
  loadCounter(){
    this.showTime = '00:60';
    this.timeLeft = 60;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.showTime = this.convertHMS(this.timeLeft)
      } else {
        this.timeLeft = false;
        this.showTime = false
      }
    }, 1000)
}

convertHMS(value: any) {
  const sec = parseInt(value, 10);
  let hours: any = Math.floor(sec / 3600);
  let minutes: any = Math.floor((sec - (hours * 3600)) / 60);
  let seconds: any = sec - (hours * 3600) - (minutes * 60);

  if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }
  return minutes + ':' + seconds;
}

startCounter(){
  clearInterval(this.interval);
  this.generateOTP()
}

  generateOTP(){
    this.sentPhoneNumber = true;
    this.loadCounter();
  }

  handeOtpChange(value: string[]): void {
    console.log(value);
  }

  handleFillEvent(value: string): void {
    console.log(value);
  }

}
