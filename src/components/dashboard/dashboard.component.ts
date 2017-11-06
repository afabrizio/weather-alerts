import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../../services/api.service';

import 'rxjs/add/operator/map';

export interface Alert {
  icon: string;
  service: string;
  action: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  phone: string;
  loading = false;
  valid = false;
  city: string;
  columns = ['Service', 'Description', 'Action'];
  rows: Alert[] = [
    {
      icon: 'fa-cloud',
      service: 'Current Weather',
      action: 'Text Me'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.paramMap
    .map( (params: ParamMap) => params.get('phone'))
    .subscribe( (phone: string) => {
      this.phone = phone.replace(new RegExp('[^0-9]', 'g'), '');
    });
  }

  weatherSMS() {
      this.api.weatherSMS(this.phone, this.city ? this.city : 'irvine')
      .subscribe(
        data => {
          console.log(data);
        }
      );
  }
}
