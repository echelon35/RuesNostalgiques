import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { WeatherforecastComponent } from './weatherforecast/weatherforecast.component';
import { OldnewpictureComponent } from './oldnewpicture/oldnewpicture.component';
import { AngularResizeElementModule } from './resizable-element/resizable-element.module';

@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    WeatherforecastComponent,
    OldnewpictureComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AngularResizeElementModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
