import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ApiService } from '../../services/api.service';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  formattedPhone;
  phone: string;
  loading = false;
  valid = false;
  code = [null, null, null, null, null, null];
  userFail = false;

  constructor(
    public api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.paramMap
      .map( (params: ParamMap) => params.get('phone'))
      .subscribe( (phone: string) => {
        this.formattedPhone = phone;
        this.phone = phone.replace(new RegExp('[^0-9]', 'g'), '');
      });
  }

  next(e: KeyboardEvent, i: number) {
    e.preventDefault();
    if (e.keyCode < 48 || e.keyCode > 57) {
      (e.target as any).value = null;
      this.code[i] = undefined;
    } else {
      (e.target as any).value = e.key;
      this.code[i] = e.key;
      // Moves focus tp next input:
      if ( i < 5) {
        (document.querySelector(`input:nth-child(${i + 2})`) as any).focus();
      }
    }

    // sets the 'valid' flag if all 6 digits are entered:
    if (this.code.filter(digit => !!digit).length === 6) {
      this.valid = true;
    } else {
      this.valid = false;
    }
  }

  verify() {
    this.userFail = false;
    this.loading = true;
    const unverifiedCode = (this.code.toString()).replace(/,/g, '');
    this.api.verify(this.phone, unverifiedCode)
      .subscribe(
        data => {
          this.loading = false;
          if (data.user && data.user.verified) {
            this.router.navigate(['/dashboard/' + this.phone]);
          } else {
            this.userFail = true;
          }
        },
        error => {
          this.loading = false;
          console.warn(error);
        }
      );
  }

}
