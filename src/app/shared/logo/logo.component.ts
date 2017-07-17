import {Component, Input} from "@angular/core";

@Component({
  moduleId: module.id,
  selector: 'wp-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent {
  @Input() link: string;
}
