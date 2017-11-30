import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from './profile-page/profile.service';

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
    { link: '/statistic', icon: 'trending_up', text: 'Statistic' },
    { link: '/shops', icon: 'shop_two', text: 'Shops' },
    { link: '/products', icon: 'restaurant', text: 'Products' },
    { link: '/management', icon: 'edit', text: 'Management' },
    { link: '/feedback', icon: 'feedback', text: 'Feedback' }
  ];

  constructor(private router: Router, private profile: ProfileService) { }

  ngOnInit() {
    this.profile.getProfileImage().subscribe(
      image => {
      this.profileImage = image;
    },
      error => alert(error));
  }

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
