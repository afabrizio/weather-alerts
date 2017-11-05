import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  public mode = 'development';
  public api = 'http://localhost:3000/api';

  constructor(public http: Http) { }

  gateway(path: string, payload: object): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.api + path, JSON.stringify(payload), new RequestOptions({headers: headers}))
      .map( res => res.json() );
  }

  screenPhone(phone: string): Observable<any> {
    return this.gateway('/screen', { phone: phone } );
  }

}
