import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from './login.service';
import { RouterLoggerService } from './router-logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public loginService: LoginService, private routerLoggerService: RouterLoggerService, private router: Router) {

  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        let userName = (this.loginService.currentUserName) ? this.loginService.currentUserName : 'ananymous';
        let logMsg = new Date().toLocaleString() + ':' + userName + ' navigates to ' + event.url;

        this.routerLoggerService.log(logMsg).subscribe();
      }
    });
  }

  onSearchClick() {
    console.log(this.loginService.currentUserName);
  }  
}
