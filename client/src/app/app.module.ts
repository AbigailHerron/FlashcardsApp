import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ReactiveFormsModule } from '@angular/forms';
import { BannerComponent } from './components/banner/banner.component';
import { DashboardLinksComponent } from './components/dashboard-links/dashboard-links.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateStackComponent } from './components/create-stack/create-stack.component';
import { UserHubComponent } from './components/user-hub/user-hub.component';
import { SelectCardStackComponent } from './components/select-card-stack/select-card-stack.component';

import { CreateCardItemComponent } from './components/create-card-item/create-card-item.component';

import { JwtinterceptorService } from './services/jwtinterceptor.service';
import { ViewStackComponent } from './components/view-stack/view-stack.component';
import { ViewStackMenuComponent } from './components/view-stack-menu/view-stack-menu.component';
import { ViewResultsComponent } from './components/view-results/view-results.component';

import {CloudinaryModule} from '@cloudinary/ng';
import { SelectPublicStackComponent } from './components/select-public-stack/select-public-stack.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    BannerComponent,
    DashboardLinksComponent,
    ProfileComponent,
    CreateStackComponent,
    UserHubComponent,
    SelectCardStackComponent,
    CreateCardItemComponent,
    ViewStackComponent,
    ViewStackMenuComponent,
    ViewResultsComponent,
    SelectPublicStackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    CloudinaryModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS, useClass: JwtinterceptorService, multi: true
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
