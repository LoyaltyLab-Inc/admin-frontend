import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ProductsPageService } from '../products-page/products-page.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material';
import { Shop } from '../../models/Shop';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import { ShopsPageService } from './shops-page.service';

@Component({
  selector: 'af-shops-page',
  templateUrl: './shops-page.component.html',
  styleUrls: ['./shops-page.component.less'],
  providers: [ShopsPageService]
})
export class ShopsPageComponent implements OnInit {
  searchForm: FormGroup;
  @ViewChild('search') searchElement: ElementRef;
  private shops: Shop[] = [];
  @Input() private pageIndex = 0;
  @Input() private pageSize = 25;
  @Input() private pageLength = 1000;
  @Input() pageEvent: PageEvent;
  private searchText = 'undefined';

  constructor(private shopsService: ShopsPageService,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
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
        this.pageIndex = 0;
        this.router.navigate(['/shops'], {
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

      this.shopsService.getShops(this.pageIndex, this.pageSize, this.searchText).subscribe((shops: Shop[]) => {
        this.shops = shops;
      });
      this.shopsService.getShopsAmount(this.searchText).subscribe((pageLength: {length}) => {
        this.pageLength = pageLength.length;
      });
    });

    this.router.navigate(['/shops'], {
      queryParams: {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        searchText: this.searchText
      }
    });
  }

  onShowStatistic(id: number) {
    this.router.navigate(['/statistic/shop'], {
      queryParams: { id }
    });
  }

  refreshPage(event) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.router.navigate(['/shops'], {
      queryParams: {
        pageIndex: event.pageIndex,
        pageSize: event.pageSize,
        searchText: this.searchText
      }
    });
  }

}
