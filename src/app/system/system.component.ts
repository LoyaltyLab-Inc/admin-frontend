import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'af-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.less']
})
export class SystemComponent implements OnInit {
  isMenuTransitioned = false;
  isMenuOpen = true;

  constructor(private router: Router) { }

  ngOnInit() { }

  onLogoClick() {
    this.router.navigate(['/statistic']);
  }

  onMenuBtnOpen() {
    this.isMenuTransitioned = true;
    this.isMenuOpen = !this.isMenuOpen;

    setTimeout(() => { this.isMenuTransitioned = false; }, 500);
  }

  onLogOutClick() {

  }

  onProfileClick() {

  }

}
