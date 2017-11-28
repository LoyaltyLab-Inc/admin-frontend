import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class ProfileService {

  constructor(private http: Http) { }

  getProfile() {
    return this.http.get('http://localhost:8080/api/user')
      .map(res => res.json())
      .map(res => res.results);
  }
}
