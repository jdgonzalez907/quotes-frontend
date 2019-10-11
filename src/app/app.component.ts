import { Component, OnInit } from '@angular/core';
import { QuoteService } from './services/quote.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  quoteModel: Quote;
  displayedColumns: string[] = ['id', 'quote', 'actions'];
  dataSource: Quote[] = [];

  constructor(
    private quoteService: QuoteService
  ) {}

  ngOnInit() {
    this.getAllQuotes();
  }

  getAllQuotes(): void {
    this.quoteService.getAllQuotes().subscribe(
      resultDataResponse => this.dataSource = resultDataResponse.data,
      (error: ResultMessageResponse)  => alert(error.message)
    );
  }

  generateRandomQuote(): void {
    this.quoteService.generateRandomQuote().subscribe(
      resultDataResponse => {
        this.quoteModel = resultDataResponse.data;
        this.getAllQuotes();
      },
      (error: ResultMessageResponse)  => alert(error.message)
    );
  }

  getQuote(id: number): void {
    this.quoteService.getQuote(id).subscribe(
      resultDataResponse => this.quoteModel = resultDataResponse.data,
      (error: ResultMessageResponse)  => alert(error.message)
    );
  }

  viewQuote(quote: Quote): void {
    this.quoteModel = quote;
  }

  deleteQuote(quote: Quote): void {
    this.quoteModel = null;
    this.quoteService.deleteQuote(quote.id).subscribe(
      resultDataResponse => this.getAllQuotes(),
      (error: ResultMessageResponse)  => alert(error.message)
    );
  }
}
