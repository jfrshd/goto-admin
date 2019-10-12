import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuardService} from './services/auth-guard.service';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AddPostComponent} from './add-post/add-post.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      {path: '', component: AddPostComponent},
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
