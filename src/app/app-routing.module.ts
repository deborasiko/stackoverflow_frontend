import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {QuestionDetailComponent} from "./question-detail/question-detail.component";
import {QuestionsComponent} from "./questions/questions.component";
import {AnswersComponent} from "./answers/answers.component";
import {AnswerDetailComponent} from "./answer-detail/answer-detail.component";

const routes: Routes = [
  { path: 'questions', component: QuestionsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: QuestionDetailComponent },
  { path: 'answers', component: AnswersComponent },
 // { path: 'detail/:id', component: AnswerDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
