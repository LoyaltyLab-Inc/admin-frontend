import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ProductPredictService } from './product-predict.service';

@Component({
  selector: 'af-product-predict',
  templateUrl: './product-predict.component.html',
  styleUrls: ['./product-predict.component.less'],
  providers: [ProductPredictService]
})
export class ProductPredictComponent implements OnInit {
  searchForm: FormGroup;
  productsFrom: string[];
  productsTo: string[];
  productsPredicted: string[] = [];
  searchText: string;
  @ViewChild('search') searchElement: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private predictProduct: ProductPredictService) { }

  ngOnInit(): void {
    this.productsFrom = [];
    this.productsTo = [];
    this.searchForm = this.formBuilder.group({
      search: ['']
    });

    // Следим за изменением поля поиска
    Observable.fromEvent(this.searchElement.nativeElement, 'input')
      .map((e: any) => e.target.value)
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(() => {
        this.searchText = this.searchForm.value.search.toLowerCase();
        this.predictProduct.postSearch(this.searchText).subscribe((response: any) => {
          console.log(response);
          this.productsFrom = response['products'].slice(0, 20);
        });
      });
  }

  onProductClick($event) {
    const text = $event.srcElement.innerText;
    const index = this.productsFrom.indexOf(text);
    if (index >= 0) {
      this.productsFrom.splice(index, 1);
      this.productsTo.push(text);
    } else {
      this.productsTo.splice(this.productsTo.indexOf(text), 1);
      this.productsFrom.push(text);
    }
  }

  GetPredict() {
    this.predictProduct.postProd(this.productsTo).subscribe((response: any) => {
      this.productsPredicted = response['predictions'];
    });
  }
}
