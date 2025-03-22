import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenTransactionComponent } from './token-transaction.component';

describe('TokenTransactionComponent', () => {
  let component: TokenTransactionComponent;
  let fixture: ComponentFixture<TokenTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
