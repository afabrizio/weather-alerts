import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';

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

  constructor(public api: ApiService, public router: Router) { }

  ngOnInit() { }

  getAlerts() {
    this.loading = true;
    this.api.screenPhone(this.numsOnly(this.phone))
      .subscribe(
        data => {
          this.loading = false;
          if (data.user && data.user.verified) {
            this.router.navigate(['/dashboard/' + this.phone]);
          } else {
            this.router.navigate(['/verify/' + this.phone]);
          }
        },
        error => {
          this.loading = false;
          console.warn(error);
        }
      );
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
