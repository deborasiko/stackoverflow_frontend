import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {Answer} from "./answer";

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private answerUrl = 'http://localhost:8080/answers';  // URL to web api
  constructor(private http: HttpClient, private messageService: MessageService) { }

  /** GET answers from the server */
  getAnswers(): Observable<Answer[]> {
    return this.http.get<Answer[]>(this.answerUrl+"/getAll")
      .pipe(
        tap(_ => this.log('fetched answers')),
        catchError(this.handleError<Answer[]>('getAnswers', []))
      );
  }
  /** GET hero by id. Will 404 if id not found */
  getAnswer(id: number): Observable<Answer> {
    const url = `${this.answerUrl}/${id}`;
    return this.http.get<Answer>(url).pipe(
      tap(_ => this.log(`fetched answer id=${id}`)),
      catchError(this.handleError<Answer>(`getAnswer id=${id}`))
    );
  }
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`AnswerService: ${message}`);
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
  /** PUT: update the answer on the server */
  updateAnswer(answer: Answer): Observable<any> {
    return this.http.put(this.answerUrl, answer, this.httpOptions).pipe(
      tap(_ => this.log(`updated answer id=${answer.id}`)),
      catchError(this.handleError<any>('updateAnswer'))
    );
  }
  /** POST: add a new hero to the server */
  addAnswer(answer: Answer): Observable<Answer> {
    return this.http.post<Answer>(this.answerUrl, answer, this.httpOptions).pipe(
      tap((newAnswer: Answer) => this.log(`added answer w/ id=${newAnswer.id}`)),
      catchError(this.handleError<Answer>('addAnswer'))
    );
  }
  /** DELETE: delete the answer from the server */
  deleteAnswer(id: number): Observable<Answer> {
    const url = `${this.answerUrl}/${id}`;

    return this.http.delete<Answer>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted answer id=${id}`)),
      catchError(this.handleError<Answer>('deleteAnswer'))
    );
  }
  /* GET answers whose name contains search term */
  searchAnswer(term: string): Observable<Answer[]> {
    if (!term.trim()) {
      // if not search term, return empty answer array.
      return of([]);
    }
    return this.http.get<Answer[]>(`${this.answerUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found answer matching "${term}"`) :
        this.log(`no answer matching "${term}"`)),
      catchError(this.handleError<Answer[]>('searchAnswers', []))
    );
  }
}
