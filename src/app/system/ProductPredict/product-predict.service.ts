import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductPredictService {

  constructor (private http: HttpClient) { }

  postSearch(search: string) {
    return this.http.post(`http://localhost:8080/products/search`, {'search': search});
  }

  postProd(prods: string[]) {
    return this.http.post(`http://localhost:8080/products`, {'products': prods});
  }
}
