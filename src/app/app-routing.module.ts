import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginComponent } from './pages/login/login.component';

import { ScheduleComponent } from './pages/schedule/schedule.component';
import { GradeComponent } from './pages/grade/grade.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/schedule'
  },

  {
    path: '404',
    component: PageNotFoundComponent
  },

  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'schedule',
    component: ScheduleComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'grade',
    component: GradeComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'user_profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
  },

  {
    path: '**',
    redirectTo: '/404'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
