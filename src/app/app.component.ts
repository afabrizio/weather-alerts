import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private title = 'weather-alerts';
  public phone = '';
  public valid = false;
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor() { }

  ngOnInit() { }

  getAlerts(e: Event) {
    console.log(this.numsOnly(this.phone));
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
