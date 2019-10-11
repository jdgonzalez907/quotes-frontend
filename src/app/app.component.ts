import { Component, OnInit } from '@angular/core';
import { QuoteService } from './services/quote.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';
import { titleError, titleWarning, messageDeleteConfirm, widthDialog } from './components/app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  quoteModel: Quote;
  displayedColumns: string[] = ['id', 'quote', 'view', 'delete'];
  dataSource: Quote[] = [];
  disabledRandomButton = false;

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
      (httpErrorResponse: HttpErrorResponse)  => this.processHttpErrorResponse(httpErrorResponse)
    );
  }

  generateRandomQuote(): void {
    this.quoteModel = null;
    this.disabledRandomButton = true;
    this.quoteService.generateRandomQuote().subscribe(
      (resultDataResponse: ResultDataResponse<Quote>) => {
        this.disabledRandomButton = false;
        this.quoteModel = resultDataResponse.data;
        this.getAllQuotes();
      },
      (httpErrorResponse: HttpErrorResponse)  => {
        this.disabledRandomButton = false;
        this.processHttpErrorResponse(httpErrorResponse);
      }
    );
  }

  getQuote(quote: Quote): void {
    if (!this.quoteModel || quote.id !== this.quoteModel.id) {
      this.quoteModel = null;
      this.quoteService.getQuote(quote.id).subscribe(
        (resultDataResponse: ResultDataResponse<Quote>) => this.quoteModel = resultDataResponse.data,
        (httpErrorResponse: HttpErrorResponse)  => this.processHttpErrorResponse(httpErrorResponse)
      );
    }
  }

  deleteQuote(quote: Quote): void {
    const message: MessageDialog = {
      title: titleWarning,
      message: messageDeleteConfirm,
      confirm: true
    };

    const dialogRef = this.matDialog.open(MessageDialogComponent, {
      width: widthDialog,
      disableClose: true,
      data: message
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.quoteModel = null;
        this.quoteService.deleteQuote(quote.id).subscribe(
          _ => this.getAllQuotes(),
          (httpErrorResponse: HttpErrorResponse)  => this.processHttpErrorResponse(httpErrorResponse)
        );
      }
    });
  }

  processHttpErrorResponse(httpErrorResponse: HttpErrorResponse): void {
    const messageDialogData: MessageDialog = {
      title: titleError,
      message: httpErrorResponse.error.message || httpErrorResponse.message,
      confirm: false
    };
    this.showErrorMessage(messageDialogData);
  }

  showErrorMessage(message: MessageDialog): void {
    this.matDialog.open(MessageDialogComponent, {
      width: widthDialog,
      disableClose: true,
      data: message
    });
  }
}
