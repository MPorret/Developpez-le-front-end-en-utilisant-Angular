import { Component, OnInit } from '@angular/core';
import { ErrorComponent } from "../../core/shared/error/error.component";
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss'],
    standalone: true,
    imports: [ErrorComponent]
})
export class NotFoundComponent {
  error: number = this.route.snapshot.params?.["status"] || 404;

  constructor(private route: ActivatedRoute) {}

}
