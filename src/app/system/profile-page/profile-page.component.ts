import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';

@Component({
  selector: 'af-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.less'],
  providers: [ProfileService]
})
export class ProfilePageComponent implements OnInit {

  constructor(private profile: ProfileService) { }

  ngOnInit() {
    this.profile.getProfile().subscribe(user => console.log(user));
  }

}
