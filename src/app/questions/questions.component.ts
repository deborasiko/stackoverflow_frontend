import {Component, OnInit} from '@angular/core';
import {MessageService} from "../message.service";
import {QuestionService} from "../question.service";
import {Question} from "../question";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss'
})
export class QuestionsComponent implements OnInit{
  selectedQuestion?: Question;

  questions: Question[] = [];

  constructor(private questionService: QuestionService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getQuestions();
  }

  onSelect(question: Question): void {
    this.selectedQuestion = question;
    this.messageService.add(`QuestionsComponent: Selected questions id=${question.questionId}`);
  }

  getQuestions(): void {
    this.questionService.getQuestions()
      .subscribe(questions => this.questions = questions);
  }
  add(title: string): void {
    title = title.trim();
    if (!title) { return; }
    this.questionService.addQuestion({ title } as Question)
      .subscribe(questions => {
        this.questions.push(questions);
      });
  }
  delete(question: Question): void {
    this.questions = this.questions.filter(h => h !== question);
    this.questionService.deleteQuestion(question.questionId).subscribe();
  }
}
