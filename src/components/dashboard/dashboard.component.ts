import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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
  phone: number;
  loading = false;
  valid = false;
  columns = ['Service', 'Description', 'Action'];
  rows: Alert[] = [
    {
      icon: 'fa',
      service: 'Current Weather',
      action: 'Text Me'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.paramMap
    .map( (params: ParamMap) => params.get('phone'))
    .subscribe( (phone: string) => {
      this.phone = parseInt(phone.replace(new RegExp('[^0-9]', 'g'), ''), 10);
    });
  }

}
