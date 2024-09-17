import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(private router: Router){}

  public async canActivate(): Promise<boolean>{
    if (localStorage.getItem('status') == undefined || localStorage.getItem('status') == 'logged-out') {
      this.router.navigate(['/auth']);
      return false
    } 
    else {
      this.router.navigate(['/admin/dashboard']);
      return true
    }
  }
  
}
