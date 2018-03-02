import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BASE_URL } from '../../constants/baseUrl.const';

@Injectable()
export class ProductsPageService {

  constructor (private http: HttpClient) { }

  getProducts(pageIndex: number, pageSize: number, searchText: string) {
    return this.http.get(`${BASE_URL}/api/products/get`, {
      params: new HttpParams().append('pageIndex', pageIndex.toString())
        .append('pageSize', pageSize.toString())
        .append('searchText', searchText)
    });
  }

  getProductsAmount(searchText: string) {
    return this.http.get(`${BASE_URL}/api/products/productsAmount`, {
      params: new HttpParams().append('searchText', searchText)
    });
  }

  putProductDiscount(ids: number[], discount: number) {
    return this.http.put(`${BASE_URL}/api/products/setDiscount`, {ids, discount});
  }
}
