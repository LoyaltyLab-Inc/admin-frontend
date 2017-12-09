import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BASE_URL } from '../../constants/baseUrl.const';

@Injectable()
export class ShopsPageService {

  constructor (private http: HttpClient) { }

  getShops(pageIndex: number, pageSize: number, searchText: string) {
    return this.http.get(`${BASE_URL}/api/shops/get`, {
      params: new HttpParams().append('pageIndex', pageIndex.toString())
        .append('pageSize', pageSize.toString())
        .append('searchText', searchText)
    });
  }

  getShopsAmount(searchText: string) {
    return this.http.get(`${BASE_URL}/api/shops/shopsAmount`, {
      params: new HttpParams().append('searchText', searchText)
    });
  }
}
