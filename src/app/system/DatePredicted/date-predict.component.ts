import { Component, ElementRef, Inject, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
//import { DatePredictService } from './date-predict.service';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class DatePredictService {

  constructor (private http: HttpClient) { }

  postSearch(id: string) {
    return this.http.post(`http://localhost:8080/date`, {'id': id});
  }
}

@Component({
  selector: 'af-date-predict',
  templateUrl: './date-predict.component.html',
  styleUrls: ['./date-predict.component.less'],
  providers: [ DatePredictService ]
})
export class DatePredictComponent implements OnInit {

  searchForm: FormGroup;
  searchText: string;
  dateObject: any = {};
  @ViewChild('search') searchElement: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private predictDate: DatePredictService) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      search: ['']
    });

    Observable.fromEvent(this.searchElement.nativeElement, 'input')
      .map((e: any) => e.target.value)
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(() => {
        this.searchText = this.searchForm.value.search.toLowerCase();
        this.predictDate.postSearch(this.searchText).subscribe((response: any) => {
          console.log(response);
          this.dateObject = response;
        });
      });
  }
}
