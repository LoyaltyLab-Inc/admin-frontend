import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import { Observable } from 'rxjs/Observable';

@Injectable()

export class ProfileService {

  constructor(private http: Http) { }

  getProfile() {
   return this.http.get('http://localhost:8080/api/user')
      .map((res: Response) => {
        return res.json();
      })
     .catch((error: Response) => {
       return Observable.throw('Сервер недоступен');
     });
  }

  getProfileImage() {
    return this.http.get('http://localhost:8080/api/user')
      .map(res => {
        return res.json();
      })
      .catch((error: Response) => {
        return Observable.throw('Сервер недоступен');
      })
      .map(res => res.image);
  }
}
