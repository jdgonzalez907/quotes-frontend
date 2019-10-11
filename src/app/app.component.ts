import { Component, OnInit } from '@angular/core';
import { QuoteService } from './services/quote.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  quoteModel: Quote;
  displayedColumns: string[] = ['id', 'quote', 'view', 'delete'];
  dataSource: Quote[] = [];

  constructor(
    private matDialog: MatDialog,
    private quoteService: QuoteService
  ) {}

  ngOnInit() {
    this.getAllQuotes();
  }

  getAllQuotes(): void {
    this.quoteService.getAllQuotes().subscribe(
      (resultDataResponse: ResultDataResponse<Quote[]>) => this.dataSource = resultDataResponse.data,
      (httpErrorResponse: HttpErrorResponse)  => this.showMessage(httpErrorResponse.error.message)
    );
  }

  generateRandomQuote(): void {
    this.quoteService.generateRandomQuote().subscribe(
      (resultDataResponse: ResultDataResponse<Quote>) => {
        this.quoteModel = resultDataResponse.data;
        this.getAllQuotes();
      },
      (httpErrorResponse: HttpErrorResponse)  => this.showMessage(httpErrorResponse.error.message)
    );
  }

  getQuote(quote: Quote): void {
    if (!this.quoteModel || quote.id !== this.quoteModel.id) {
      this.quoteModel = null;
      this.quoteService.getQuote(quote.id).subscribe(
        (resultDataResponse: ResultDataResponse<Quote>) => this.quoteModel = resultDataResponse.data,
        (httpErrorResponse: HttpErrorResponse)  => this.showMessage(httpErrorResponse.error.message)
      );
    }
  }

  deleteQuote(quote: Quote): void {
    this.quoteModel = null;
    this.quoteService.deleteQuote(quote.id).subscribe(
      _ => this.getAllQuotes(),
      (httpErrorResponse: HttpErrorResponse)  => this.showMessage(httpErrorResponse.error.message)
    );
  }

  showMessage(message: string): void {
    this.matDialog.open(MessageDialogComponent, {
      width: '250px',
      data: message
    });
  }
}
