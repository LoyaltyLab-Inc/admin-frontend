import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserContextService } from '../shared/userContext.service';

@Component({
  selector: 'af-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.less'],
  providers: []
})
export class SystemComponent implements OnInit {
  isMenuTransitioned = false;
  isMenuOpen = true;
  profileImage: string;
  pages = [
    { link: '/statistic/all', icon: 'trending_up', text: 'Statistic' },
    { link: '/shops', icon: 'shop_two', text: 'Shops' },
    { link: '/products', icon: 'restaurant', text: 'Products' },
    /*{ link: '/management', icon: 'edit', text: 'Management' },*/
    { link: '/feedback', icon: 'feedback', text: 'Feedback' }
  ];

  constructor(private router: Router,
              private userService: UserContextService) { }

  ngOnInit() {
    this.profileImage = this.userService.getUserSync().image;
  }

  onLogoClick() {
    this.router.navigate(['/statistic', 'all']);
  }

  onMenuBtnOpen() {
    this.isMenuTransitioned = true;
    this.isMenuOpen = !this.isMenuOpen;

    setTimeout(() => { this.isMenuTransitioned = false; }, 500);
  }

  onLogOutClick() {

  }

}
