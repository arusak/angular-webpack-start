import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {UserAppComponent} from "./user.app.component";
import {LoginComponent} from './components/login/login.component';


const routes: Routes = [
  {
    path: 'user',
    component: UserAppComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class UserRoutingModule {
}

