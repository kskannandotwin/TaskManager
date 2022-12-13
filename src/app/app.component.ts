import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public loginService: LoginService, private domSanitizer: DomSanitizer) {

  }

  // myProperty = '<script>alert(document.cookie)</script>';
  // myProperty = this.domSanitizer.bypassSecurityTrustHtml('<iframe src="http://www.lipsum.com"></iframe>');
  myProperty = this.domSanitizer.bypassSecurityTrustUrl('https://upload.wikimedia.org/wikipedia/commons/1/12/User_icon_2.svg');
}
