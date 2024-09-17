import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'prevueit-admin';


  ngOnInit(): void {
    if (localStorage.getItem('status') == undefined) {
      localStorage.setItem('status','logged-out')
    }
  }
}
