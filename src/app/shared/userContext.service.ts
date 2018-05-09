import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BASE_URL } from '../constants/baseUrl.const';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/User';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class UserContextService {

  private user: User = null;

  constructor(private http: HttpClient) {
  }

  getUser(email: string): Observable<User> {
    return this.http.get(`${BASE_URL}/api/user`, {
      params: new HttpParams().append('email', email)
    })
      .do((user: User) => {
        this.setUser(user);
    })
      .catch((error: Response) => {
        return Observable.throw('Сервер недоступен');
    });
  }

  getUserSync(): User {
    return this.user;
  }

  setUser(user: User) {
    if (user) {
      this.user = user;
    }
  }

  postUser(user: User): Observable<User> {
    return this.http.post(`${BASE_URL}/api/addUser`, user)
      .map(res => res as User)
      .do((res: User) => {
        console.log('user: ', res);
        this.setUser(res);
      });
  }

  /*putUser(id: string, user: User) {
    return this.http.put();
  }*/
}
