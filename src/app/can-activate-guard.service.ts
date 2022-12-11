import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuardService implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if(this.loginService.isAuthenticated()) {
      console.log(this.router.url);
      return true; // the user can navigate to the particular route
    } else {
      this.router.navigate(['login']);
      return false; // the user can't navigate to the particular route
    }
  }
}
