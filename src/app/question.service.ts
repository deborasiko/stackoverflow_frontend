import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {Question} from "./question";
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private questionsUrl = 'http://localhost:8080/questions';  // URL to web api
  constructor(private http: HttpClient, private messageService: MessageService) { }

  /** GET questions from the server */
  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.questionsUrl+"/getAll")
      .pipe(
        tap(_ => this.log('fetched questions')),
        catchError(this.handleError<Question[]>('getQuestions', []))
      );
  }
  /** GET question by id. Will 404 if id not found */
  getQuestion(id: number): Observable<Question> {
    const url = `${this.questionsUrl}/${id}`;
    return this.http.get<Question>(url).pipe(
      tap(_ => this.log(`fetched question id=${id}`)),
      catchError(this.handleError<Question>(`getQuestion id=${id}`))
    );
  }
  /** Log a QuestionService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`QuestionService: ${message}`);
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /** PUT: update the question on the server */
  updateQuestion(question: Question): Observable<any> {
    return this.http.put(this.questionsUrl, question, this.httpOptions).pipe(
      tap(_ => this.log(`updated question id=${question.questionId}`)),
      catchError(this.handleError<any>('updateQuestion'))
    );
  }
  /** POST: add a new question to the server */
  addQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(this.questionsUrl, question, this.httpOptions).pipe(
      tap((newQuestion: Question) => this.log(`added question w/ id=${newQuestion.questionId}`)),
      catchError(this.handleError<Question>('addQuestion'))
    );
  }
  /** DELETE: delete the question from the server */
  deleteQuestion(id: number): Observable<Question> {
    const url = `${this.questionsUrl}/${id}`;

    return this.http.delete<Question>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted question id=${id}`)),
      catchError(this.handleError<Question>('deleteQuestion'))
    );
  }
  /* GET questions whose name contains search term */
  searchQuestions(term: string): Observable<Question[]> {
    if (!term.trim()) {
      // if not search term, return empty question array.
      return of([]);
    }
    return this.http.get<Question[]>(`${this.questionsUrl}/filterByTitle?title=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found questions matching "${term}"`) :
        this.log(`no questions matching "${term}"`)),
      catchError(this.handleError<Question[]>('searchQuestions', []))
    );
  }
}
