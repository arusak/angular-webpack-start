import {Component, OnInit} from "@angular/core";
@Component({
  moduleId: module.id,
  selector: 'wp-app-admin',
  templateUrl: 'admin.app.component.html',
  styleUrls: ['admin.app.component.css']
})
export class AdminAppComponent implements OnInit {
  ngOnInit(): void {
    // testing how stacktraces work through sourcemaps
    throw new Error("Method not implemented.");
  }

}
