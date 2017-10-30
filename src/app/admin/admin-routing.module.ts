import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {AdminAppComponent} from "./admin.app.component";
import {LoginComponent} from './components/login/login.component';


const routes: Routes = [
  {
    path: 'admin',
    component: AdminAppComponent,
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
export class AdminRoutingModule {
}

