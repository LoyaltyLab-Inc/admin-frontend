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
    { link: '/statistic', icon: 'trending_up', text: 'Statistic' },
    { link: '/shops', icon: 'shop_two', text: 'Shops' },
    { link: '/products', icon: 'restaurant', text: 'Products' },
    { link: '/management', icon: 'edit', text: 'Management' },
    { link: '/feedback', icon: 'feedback', text: 'Feedback' }
  ];

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
