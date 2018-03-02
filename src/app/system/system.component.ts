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
  pages = [
    { link: '/personalData', icon: 'trending_up', text: 'Statistic' },
    { link: '/education', icon: 'shop_two', text: 'Shops' },
    { link: '/lastWork', icon: 'restaurant', text: 'Products' },
    /*{ link: '/management', icon: 'edit', text: 'Management' },*/
    { link: '/dreamWork', icon: 'feedback', text: 'Feedback' },
    { link: '/result', icon: 'feedback', text: 'Feedback' }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onLogoClick() {
    this.router.navigate(['/personalData']);
  }

  onMenuBtnOpen() {
    this.isMenuTransitioned = true;
    this.isMenuOpen = !this.isMenuOpen;

    setTimeout(() => { this.isMenuTransitioned = false; }, 500);
  }

}
