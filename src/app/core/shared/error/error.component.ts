import { Component, Input, OnInit } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-error',
  imports: [ButtonComponent],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent implements OnInit {
  image: string = "../../../assets/img/404-not-found.svg";
  message: string = "Error 404, page not found";
  @Input()
  button: boolean = true;
  @Input({required: true})
  status!: number;

  constructor(private loadingService: LoadingService){}

  ngOnInit(): void {
    if (this.status >= 500) {
      this.image = '../../../assets/img/internal-server-error-500.svg';
      this.message = "Oops! Something went wrong. Please try again later.";
    }
    this.loadingService.loadingOff();
  }
}
