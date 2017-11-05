import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  public loading = false;
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public phone = '';
  public valid = false;

  constructor(public router: Router) { }

  ngOnInit() { }

  getAlerts() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/verify/' + this.phone]);
    }, 250);
  }

  validate() {
    if (this.numsOnly(this.phone).length === 10) {
      this.valid = true;
    } else {
      this.valid = false;
    }
  }

  numsOnly(formatted: string): string {
    return formatted.replace(new RegExp('[^0-9]', 'g'), '');
  }

}
