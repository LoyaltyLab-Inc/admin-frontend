import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from '../profile.service';
import { FeedbackService } from './feedback.service';

@Component({
  selector: 'af-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./feedback-page.component.less'],
  providers: [ProfileService, FeedbackService]
})
export class FeedbackPageComponent implements OnInit {
  @ViewChild('feedbackText') feedback: ElementRef;
  private user;

  constructor(private profileService: ProfileService,
              private feedbackService: FeedbackService) { }

  ngOnInit() {
    this.profileService.getProfile().subscribe(user => this.user = user);
  }

  sendFeedback() {
    this.feedbackService.postFeeadback(this.feedback.nativeElement.value)
      .subscribe(res => console.log(res));
  }
}
