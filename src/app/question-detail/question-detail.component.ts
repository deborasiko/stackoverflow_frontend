import {Component, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

import {QuestionService} from "../question.service";
import {Question} from "../question";

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrl: './question-detail.component.scss'
})
export class QuestionDetailComponent {
  @Input() question?: Question;
  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.getQuestion();
  }

  getQuestion(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.questionService.getQuestion(id)
      .subscribe(question => this.question = question);
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    if (this.question) {
      this.questionService.updateQuestion(this.question)
        .subscribe(() => this.goBack());
    }
  }
}
