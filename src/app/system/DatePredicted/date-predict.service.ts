import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DatePredictService {

  constructor (private http: HttpClient) { }

  postSearch(id: string) {
    return this.http.post(`http://localhost:8080/date`, {'id': id});
  }
}
