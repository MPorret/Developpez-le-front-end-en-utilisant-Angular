import { Component, Input } from '@angular/core';
import { Indicator } from '../../models/Indicator';

@Component({
  selector: 'app-header-page',
  imports: [],
  templateUrl: './header-page.component.html',
  styleUrl: './header-page.component.scss'
})
export class HeaderPageComponent {
  @Input()
  indicators: Indicator[] = [];
  @Input()
  title!: string;
}
