import {Component, OnInit} from '@angular/core';
import {MessageService} from "../message.service";
import {Answer} from "../answer";
import {AnswerService} from "../answer.service";

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrl: './answers.component.scss'
})
export class AnswersComponent implements OnInit{
  selectedAnswer?: Answer;

  answers: Answer[] = [];

  constructor(private answerService: AnswerService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getAnswers();
  }

  onSelect(answer: Answer): void {
    this.selectedAnswer = answer;
    this.messageService.add(`AnswerComponent: Selected answers id=${answer.id}`);
  }

  getAnswers(): void {
    this.answerService.getAnswers()
      .subscribe(answers => this.answers = answers);
  }
  add(text: string): void {
    text = text.trim();
    if (!text) { return; }
    this.answerService.addAnswer({ text } as Answer)
      .subscribe(answers => {
        this.answers.push(answers);
      });
  }
  delete(answer: Answer): void {
    this.answers = this.answers.filter(h => h !== answer);
    this.answerService.deleteAnswer(answer.id).subscribe();
  }
}
