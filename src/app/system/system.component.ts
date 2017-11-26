import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'af-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.less']
})
export class SystemComponent implements OnInit {
  isMenuTransitioned = false;
  isRightBtnTransitioned = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate(['/system/statistic']);
  }

  onMenuBtnOpen() {
    this.isMenuTransitioned = true;

    setTimeout(() => { this.isMenuTransitioned = false; }, 500);
  }

  onLogOutClick() {

  }

  onProfileClick() {

  }

}
