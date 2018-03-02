import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BASE_URL } from '../../constants/baseUrl.const';
import { User } from '../../models/User';

@Injectable()
export class FeedbackService {

  constructor (private http: HttpClient) { }

  postFeeadback(userFeedback: string) {
    const feedback = {
      text: userFeedback
    };
    return this.http.post(`${BASE_URL}/api/feedback`, feedback);
  }
}
