import { Component, OnInit } from '@angular/core';
import { ErrorComponent } from "../../core/shared/error/error.component";

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss'],
    standalone: true,
    imports: [ErrorComponent]
})
export class NotFoundComponent implements OnInit {
  error: number = 404;

  constructor() { }

  ngOnInit(): void {
  }

}
