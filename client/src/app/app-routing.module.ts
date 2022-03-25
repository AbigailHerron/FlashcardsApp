import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardLinksComponent } from './components/dashboard-links/dashboard-links.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserHubComponent } from './components/user-hub/user-hub.component';
import { CreateStackComponent } from './components/create-stack/create-stack.component';
import { ViewStackComponent } from './components/view-stack/view-stack.component';
import { ViewStackMenuComponent } from './components/view-stack-menu/view-stack-menu.component';
import { ViewResultsComponent } from './components/view-results/view-results.component';
import { SelectPublicStackComponent } from './components/select-public-stack/select-public-stack.component';
import { AuthGuard } from './security/auth.guard';

const routes: Routes = [ 
{path: '', component: LoginComponent },
{path: 'signup', component: SignupComponent },

{path: 'dashboard', component: DashboardLinksComponent,
 canActivate: [AuthGuard]},

{path: 'profile', component: ProfileComponent, 
canActivate: [AuthGuard]},

{path: 'userhub', component: UserHubComponent, 
canActivate: [AuthGuard]},

{path: 'communityhub', component: SelectPublicStackComponent, 
canActivate: [AuthGuard]},

{path: 'createstack', component: CreateStackComponent, 
canActivate: [AuthGuard]},

{path: 'viewstackmenu', component: ViewStackMenuComponent, 
canActivate: [AuthGuard]},

{path: 'viewstack', component: ViewStackComponent, 
canActivate: [AuthGuard]},

{path: 'viewresults', component: ViewResultsComponent, 
canActivate: [AuthGuard]},

{ path: '**', redirectTo: '' } // Otherwise redirect to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, SignupComponent, DashboardLinksComponent, ProfileComponent]
