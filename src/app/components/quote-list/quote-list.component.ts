import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css']
})
export class QuoteListComponent {

  @Input() dataSource: Quote[];
  @Input() displayedColumns: string[];
  @Output() quoteViewEvent = new EventEmitter<Quote>();
  @Output() quoteDeleteEvent = new EventEmitter<Quote>();

  constructor() { }

  viewQuote(quote: Quote): void {
    this.quoteViewEvent.emit(quote);
  }

  deleteQuote(quote: Quote): void {
    this.quoteDeleteEvent.emit(quote);
  }

}
