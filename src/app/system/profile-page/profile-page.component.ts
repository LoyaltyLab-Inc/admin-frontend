import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ProfileService } from './profile.service';
import { User } from '../../models/User';

@Component({
  selector: 'af-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.less'],
  providers: [ProfileService]
})
export class ProfilePageComponent implements OnInit {

  constructor(private profile: ProfileService) { }

  user: User = {
    name: '',
    surname: '',
    image: '',
    position: ''
  };

  // TODO: сделать нормальный обработчик ошибок
  ngOnInit() {
    this.profile.getProfile().subscribe(
      user => {
      this.user = user;
      },
      error => console.log(error)
    );
  }

}
