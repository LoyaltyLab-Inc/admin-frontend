import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FeedbackService } from './feedback.service';

@Component({
  selector: 'af-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./feedback-page.component.less'],
  providers: [FeedbackService]
})
export class FeedbackPageComponent implements OnInit {
  @ViewChild('feedbackText') feedback: ElementRef;

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit() {
  }

  sendFeedback() {
    this.feedbackService.postFeeadback(this.feedback.nativeElement.value)
      .subscribe(res => console.log(res));
  }
}
