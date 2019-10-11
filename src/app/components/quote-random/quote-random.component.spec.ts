import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteRandomComponent } from './quote-random.component';

describe('QuoteRandomComponent', () => {
  let component: QuoteRandomComponent;
  let fixture: ComponentFixture<QuoteRandomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteRandomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteRandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
