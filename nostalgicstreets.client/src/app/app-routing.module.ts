import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { WeatherforecastComponent } from './weatherforecast/weatherforecast.component';
import { OldnewpictureComponent } from './oldnewpicture/oldnewpicture.component';

const routes: Routes = [
  { path: '', component: LandingpageComponent },
  { path: 'weather', component: WeatherforecastComponent },
  { path: 'old-new', component: OldnewpictureComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
