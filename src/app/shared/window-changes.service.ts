import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/throttle';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/debounceTime';

@Injectable()
export class WindowChangesService {
  width$: Observable<number>;

  constructor() {
    const windowWidth$ = new BehaviorSubject(getWindowWidth());

    this.width$ = (windowWidth$.pluck('width') as Observable<number>)
      .throttleTime(300).distinctUntilChanged();

    Observable.fromEvent(window, 'resize')
      .map(getWindowWidth)
      .subscribe(windowWidth$);
  }
}

function getWindowWidth() {
  return {
    width: window.innerWidth
  };
}

