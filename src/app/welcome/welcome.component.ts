import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() { }

  getAlerts(e: Event) {
    console.log(this.numsOnly(this.phone));
    this.loading = true;
    setTimeout(() => this.loading = false, 500);
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
