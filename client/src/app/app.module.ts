import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ReactiveFormsModule } from '@angular/forms';
import { BannerComponent } from './components/banner/banner.component';
import { DashboardLinksComponent } from './components/dashboard-links/dashboard-links.component';
import { ProfileComponent } from './components/profile/profile.component';
<<<<<<< HEAD
=======
import { CreateStackComponent } from './components/create-stack/create-stack.component';
import { UserHubComponent } from './components/user-hub/user-hub.component';
import { SelectCardStackComponent } from './components/select-card-stack/select-card-stack.component';
>>>>>>> 1db17065440c546be5e7ad4baa443c35595cb546


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    BannerComponent,
    DashboardLinksComponent,
    ProfileComponent,
<<<<<<< HEAD
=======
    CreateStackComponent,
    UserHubComponent,
    SelectCardStackComponent,
>>>>>>> 1db17065440c546be5e7ad4baa443c35595cb546
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
