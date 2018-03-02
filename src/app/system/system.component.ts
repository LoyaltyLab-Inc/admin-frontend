import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from './profile.service';

@Component({
  selector: 'af-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.less'],
  providers: [ProfileService]
})
export class SystemComponent implements OnInit {
  isMenuTransitioned = false;
  isMenuOpen = true;
  profileImage: string;
  pages = [
    //{ link: '/statistic/all', icon: 'trending_up', text: 'Statistic' },
    //{ link: '/shops', icon: 'shop_two', text: 'Shops' },
    //{ link: '/products', icon: 'restaurant', text: 'Products' },
    /*{ link: '/management', icon: 'edit', text: 'Management' },*/
    //{ link: '/feedback', icon: 'feedback', text: 'Feedback' }
    { link: '/product-predict', icon: 'restaurant', text: 'Product' },
    { link: '/time-predict', icon: 'trending_up', text: 'Time' },
    { link: '/date-predict', icon: 'trending_up', text: 'Date' }
  ];

  constructor(private router: Router, private profile: ProfileService) { }

  ngOnInit() {
    /*this.profile.getProfileImage().subscribe(
      image => {
      this.profileImage = image;
    },
      error => console.log(error));*/
  }

  onLogoClick() {
    this.router.navigate(['/product-predict']);
  }

  onMenuBtnOpen() {
    this.isMenuTransitioned = true;
    this.isMenuOpen = !this.isMenuOpen;

    setTimeout(() => { this.isMenuTransitioned = false; }, 500);
  }

  onLogOutClick() {

  }

}
