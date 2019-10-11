import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quote-random',
  templateUrl: './quote-random.component.html',
  styleUrls: ['./quote-random.component.css']
})
export class QuoteRandomComponent {

  @Input() quoteModel: Quote;
  @Input() disabledRandomButton: boolean;
  @Output() randomEvent = new EventEmitter();

  constructor() { }

  generateRandomQuote(): void {
    this.randomEvent.emit();
  }

}
