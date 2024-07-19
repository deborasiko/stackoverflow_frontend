import {Component, Input} from '@angular/core';
import {Answer} from "../answer";
import {ActivatedRoute} from "@angular/router";
import {AnswerService} from "../answer.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-answer-detail',
  templateUrl: './answer-detail.component.html',
  styleUrl: './answer-detail.component.scss'
})
export class AnswerDetailComponent {
  @Input() answer?: Answer;
  constructor(
    private route: ActivatedRoute,
    private answerService: AnswerService,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.getAnswer();
  }

  getAnswer(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.answerService.getAnswer(id)
      .subscribe(answer => this.answer = answer);
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    if (this.answer) {
      this.answerService.updateAnswer(this.answer)
        .subscribe(() => this.goBack());
    }
  }
}
