import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardLinksComponent } from './components/dashboard-links/dashboard-links.component';
import { ProfileComponent } from './components/profile/profile.component';


const routes: Routes = [ 
{path: '', component: LoginComponent },
{path: 'signup', component: SignupComponent },
// {path: 'dashboard' component: DashboardComponent } Yet to implement

{path: 'dashboard', component: DashboardLinksComponent},
{path: 'profile', component: ProfileComponent},

{ path: '**', redirectTo: '' } // Otherwise redirect to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, SignupComponent, DashboardLinksComponent, ProfileComponent]
