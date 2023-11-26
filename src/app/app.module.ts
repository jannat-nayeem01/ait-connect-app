import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { GroupService } from './group.service';
import { GroupListComponent } from './group-list/group-list.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { GroupsComponent } from './groups/groups.component';
import { InformationHubComponent } from './information-hub/information-hub.component';
import { AuthInterceptor } from './auth.interceptor';
import { InformationService } from './information.service';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    AdminDashboardComponent,
    GroupListComponent,
    StudentDashboardComponent,
    GroupsComponent,
    InformationHubComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,GroupService,InformationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
