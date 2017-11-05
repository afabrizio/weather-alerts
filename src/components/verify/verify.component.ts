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
  phone: number;
  loading = false;
  valid = false;
  code = [null, null, null, null, null, null];

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
        this.phone = parseInt(phone.replace(new RegExp('[^0-9]', 'g'), ''), 10);
      });
  }

  next(e: KeyboardEvent, i: number) {
    e.preventDefault();
    if (e.keyCode < 48 || e.keyCode > 57) {
      (e.target as any).value = null;
      this.code[i] = undefined;
    } else {
      (e.target as any).value = e.key;
      this.code[i] = parseInt(e.key, 10);
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
    this.loading = true;
    this.api.screenPhone(this.phone.toString())
      .subscribe(
        data => {
          this.loading = false;
          console.log('api screen response:', data);
          // this.router.navigate(['/dashboard/' + this.phone]);
        },
        error => {
          this.loading = false;
          console.warn(error);
        }
      );
  }

}
