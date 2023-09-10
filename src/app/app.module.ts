import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';

import { AppInitService } from './app-init.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { SliderComponent } from './pages/home/slider/slider.component';
import { OrderByPipe } from './pipes/order-by.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { LoginComponent } from './pages/login/login.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { DropdownComponent } from './utils/dropdown/dropdown.component';
import { GradeComponent } from './pages/grade/grade.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { DashboardComponent } from './templates/dashboard/dashboard.component';
import { TableComponent } from './utils/table/table.component';

export function initializeApp(preInitService: AppInitService) {
  return () => preInitService.initialize();
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    SliderComponent,
    OrderByPipe,
    FilterPipe,
    LoginComponent,
    ScheduleComponent,
    PageNotFoundComponent,
    DropdownComponent,
    GradeComponent,
    SettingsComponent,
    DashboardComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AppInitService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppInitService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
