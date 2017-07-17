import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {UserAppComponent} from "./user.app.component";


const routes: Routes = [
  {
    path: 'user',
    component: UserAppComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class UserRoutingModule {
}

