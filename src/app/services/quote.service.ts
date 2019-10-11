import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  readonly quoteBaseUrl = 'http://localhost:9000/api/v1/quotes';

  constructor(
    private http: HttpClient
  ) { }

  getAllQuotes(): Observable<ResultDataResponse<Quote[]>> {
    return this.http.get<ResultDataResponse<Quote[]>>(this.quoteBaseUrl);
  }

  generateRandomQuote(): Observable<ResultDataResponse<Quote>> {
    return this.http.get<ResultDataResponse<Quote>>(`${this.quoteBaseUrl}/random`);
  }

  getQuote(id: number): Observable<ResultDataResponse<Quote>> {
    return this.http.get<ResultDataResponse<Quote>>(`${this.quoteBaseUrl}/${id}`);
  }

  deleteQuote(id: number): Observable<null> {
    return this.http.delete<null>(`${this.quoteBaseUrl}/${id}`);
  }

}
