import { Component, ElementRef, Inject, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class TimePredictService {

  constructor (private http: HttpClient) { }

  postSearch(id: string) {
    return this.http.post(`http://localhost:8080/time`, {'id': id});
  }
}

@Component({
  selector: 'af-time-predict',
  templateUrl: './time-predict.html',
  styleUrls: ['./time-predict.less'],
  providers: [ TimePredictService ]
})
export class TimePredictComponent implements OnInit {

  searchForm: FormGroup;
  searchText: string;
  dateObject: any = {};
  @ViewChild('search') searchElement: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private predictDate: TimePredictService) { }

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
