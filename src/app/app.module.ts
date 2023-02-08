import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { JwtInterceptorService } from './interceptors/jwt-interceptor.service';
import { JwtUnauthorizedInterceptorService } from './interceptors/jwt-unauthorized-interceptor.service';
import { JwtModule } from '@auth0/angular-jwt';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AlertDirective } from './directives/alert.directive';
import { RepeaterDirective } from './directives/repeater.directive';
import { EmployeeModule } from './employee/employee.module';
import { SharedModule } from './shared/shared.module';
import { AboutComponent } from './admin/components/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    LoginComponent,
    SignUpComponent,
    AlertDirective,
    RepeaterDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    EmployeeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return (sessionStorage.getItem('currentUser') ? JSON.parse(sessionStorage.getItem('currentUser') as string).token : null)
        }
      }
    }),
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtUnauthorizedInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
