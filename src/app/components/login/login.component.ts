import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginViewModel } from '../../models/login-view-model';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginViewModel: LoginViewModel = new LoginViewModel();
  loginError: string = "";

  constructor(private loginService: LoginService, private router: Router) {

  }

  onLoginClick(event: any) {
    this.loginService.Login(this.loginViewModel).subscribe(
      (response) => {
        if (this.loginService.currentUserRole == 'Admin') {
          this.router.navigate(["/admin", "dashboard"]);
        } else {
          this.router.navigate(['/employee', 'tasks']);
        }
      },
      (error) => {
        console.log(error);
        this.loginError = "Invalid Username or Password";
      },
    );
  }

}
