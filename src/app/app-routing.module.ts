import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {QuestionDetailComponent} from "./question-detail/question-detail.component";
import {AnswerDetailComponent} from "./answer-detail/answer-detail.component";
import {QuestionsComponent} from "./questions/questions.component";
import {AnswersComponent} from "./answers/answers.component";


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'questions', component: QuestionsComponent },
  { path: 'answers', component: AnswersComponent },
  { path: 'question-detail/:id', component: QuestionDetailComponent },
  { path: 'answer-detail/:id', component: AnswerDetailComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
