import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ProductsPageService } from './products-page.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from '../../models/Product';
import { PageEvent } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import { ExtendedProduct } from '../../models/ExtendedProduct';

@Component({
  selector: 'af-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.less'],
  providers: [ProductsPageService]
})
export class ProductsPageComponent implements OnInit {
  searchForm: FormGroup;
  discountForm: FormGroup;
  discountSelectedForm: FormGroup;
  @ViewChild('search') searchElement: ElementRef;
  private products: Product[] = [];
  checkedProducts: ExtendedProduct[] = [];
  @Input() private pageIndex = 0;
  @Input() private pageSize = 25;
  @Input() private pageLength = 1000;
  @Input() pageEvent: PageEvent;
  @Input() pageSizeOptions = [10, 25, 50];
  private searchText = 'undefined';
  private digitRegex = /^\d*\.?\d+$/;

  constructor(private productsService: ProductsPageService,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search: ['']
    });
    this.discountForm = this.formBuilder.group({
      discount: ['', [Validators.min(0), Validators.max(100), Validators.pattern(this.digitRegex)]]
    });
    this.discountSelectedForm = this.formBuilder.group({
      discountSelected: ['', [Validators.min(0), Validators.max(100), Validators.pattern(this.digitRegex)]]
    });

    // Следим за изменением поля поиска
    Observable.fromEvent(this.searchElement.nativeElement, 'input')
      .map((e: any) => e.target.value)
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(() => {
        this.searchText = this.searchForm.value.search.toLowerCase();
        this.pageIndex = 0;
        this.router.navigate(['/products'], {
          queryParams: {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            searchText: this.searchText === '' ? 'undefined' : this.searchText
          }
        });
      });

    // Следим за изменениями адресной строки
    this.activeRoute.queryParams.subscribe((params: Params) => {
      if (params.pageIndex && params.pageSize) {
        this.pageIndex = params.pageIndex;
        this.pageSize = params.pageSize;
        this.searchText = params.searchText;
      }

      this.productsService.getProducts(this.pageIndex, this.pageSize, this.searchText).subscribe((products: Product[]) => {
        this.products = products;
        this.checkedProducts = [];
        for (const product of products) {
          this.checkedProducts.push({id: product.id, checked: false});
        }
      });

      this.productsService.getProductsAmount(this.searchText).subscribe((pageLength: {length}) => {
        this.pageLength = pageLength.length;
      });
    });

    this.router.navigate(['/products'], {
      queryParams: {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        searchText: this.searchText
      }
    });
  }

  changeDiscount(ids: number[], discount: number) {
    for (const prod of this.products) {
      if (ids.indexOf(prod.id) > -1) {
        prod.maxDiscount = discount;
      }
    }
    this.productsService.putProductDiscount(ids, discount).subscribe();
  }

  onDiscountChange(id: number, event) {
    const discount = parseInt(event.target.value, 10);
    if (isNaN(discount) || discount < 0 || discount > 100) {
      return;
    }
    this.changeDiscount([id], discount);
  }

  onSelectedDiscountChange(event) {
    const discount = parseInt(event.target.value, 10);
    if (isNaN(discount) || discount < 0 || discount > 100) {
      return;
    }
    const ids = [];
    for (const prod of this.checkedProducts) {
      if (prod.checked) {
        ids.push(prod.id);
      }
    }
    this.changeDiscount(ids, discount);
  }

  onCheckboxClick(id: number, event) {
    for (let i = 0; i < this.checkedProducts.length; i++) {
      if (this.checkedProducts[i].id === id) {
        this.checkedProducts[i].checked = !this.checkedProducts[i].checked;
      }
    }
    event.stopPropagation();
  }

  selectedCount() {
    let ans = 0;
    for (const checkProd of this.checkedProducts) {
      if (checkProd.checked) {
        ans += 1;
      }
    }
    return ans;
  }

  selectAll() {
    this.checkedProducts = this.checkedProducts.map(item => {
      return {id: item.id, checked: true};
    });
  }

  onShowStatistic(id: number) {
    this.router.navigate(['/statistic/product'], {
      queryParams: { id }
    });
  }

  refreshPage(event) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.router.navigate(['/products'], {
      queryParams: {
        pageIndex: event.pageIndex,
        pageSize: event.pageSize,
        searchText: this.searchText
      }
    });
  }

}
