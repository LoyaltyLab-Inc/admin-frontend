import { Component, OnInit } from '@angular/core';

import { User } from '../../models/User';
import { UserContextService } from '../../shared/userContext.service';

@Component({
  selector: 'af-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.less'],
  providers: []
})
export class ProfilePageComponent implements OnInit {
  user: User = {
    name: '',
    image: '',
    position: '',
    email: '',
    password: ''
  };

  constructor(private userService: UserContextService) { }

  ngOnInit() {
    this.user = this.userService.getUserSync();
  }

}
