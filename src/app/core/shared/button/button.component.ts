import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input()
  url: string = '';
  @Input()
  content: string = '';

  constructor(private router: Router){}
  goTo(){
    this.router.navigateByUrl(this.url)
  }
}
