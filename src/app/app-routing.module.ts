import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { GroupsComponent } from './groups/groups.component';
import { InformationHubComponent } from './information-hub/information-hub.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'student-dashboard', component: StudentDashboardComponent, children: [
    { path: 'groups', component: GroupsComponent },
    { path: 'information-hub', component: InformationHubComponent },
  ]},
  {path:'signup', component:SignupComponent},
  { path: 'login', component:LoginComponent},
  { path: 'dashboard', component: DashboardComponent},
  {path: 'admin-dashboard', component: AdminDashboardComponent },
  //{ path: 'information-hub', component: InformationHubComponent },
  //{ path: 'student-dashboard', component: StudentDashboardComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
