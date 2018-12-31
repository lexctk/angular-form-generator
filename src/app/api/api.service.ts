import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FormJson } from '../models/form-json.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  apiURL = 'assets/form.json';
  postURL = 'postURL';

  private static handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('An error occurred:', error.error.message);
    } else {
      // Backend returned 404 or 500
      console.error('Backend returned code ${error.status}, ' + 'body was: ${error.error}');
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  getFormJSON() {
    return this.http.get<FormJson>(this.apiURL)
      .pipe(catchError(ApiService.handleError));
  }

  postFormJSON(answers: FormGroup) {
    return this.http.post<FormGroup>(this.postURL, answers)
      .pipe(catchError(ApiService.handleError));
  }
}
