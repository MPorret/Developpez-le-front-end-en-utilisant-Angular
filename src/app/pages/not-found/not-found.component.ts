import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from 'src/app/core/shared/button/button.component';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss'],
    standalone: true,
    imports: [ButtonComponent]
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
