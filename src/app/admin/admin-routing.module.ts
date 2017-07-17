import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {AdminAppComponent} from "./admin.app.component";


const routes: Routes = [
  {
    path: 'admin',
    component: AdminAppComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AdminRoutingModule {
}

