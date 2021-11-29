import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardLinksComponent } from './components/dashboard-links/dashboard-links.component';
import { ProfileComponent } from './components/profile/profile.component';
<<<<<<< HEAD
=======
import { UserHubComponent } from './components/user-hub/user-hub.component';
import { CreateStackComponent } from './components/create-stack/create-stack.component';
>>>>>>> 1db17065440c546be5e7ad4baa443c35595cb546


const routes: Routes = [ 
{path: '', component: LoginComponent },
{path: 'signup', component: SignupComponent },
// {path: 'dashboard' component: DashboardComponent } Yet to implement
<<<<<<< HEAD

{path: 'dashboard', component: DashboardLinksComponent},
{path: 'profile', component: ProfileComponent},
=======
{path: 'dashboard', component: DashboardLinksComponent},
{path: 'profile', component: ProfileComponent},
{path: 'userhub', component: UserHubComponent},
{path: 'createstack', component: CreateStackComponent},
>>>>>>> 1db17065440c546be5e7ad4baa443c35595cb546

{ path: '**', redirectTo: '' } // Otherwise redirect to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, SignupComponent, DashboardLinksComponent, ProfileComponent]
