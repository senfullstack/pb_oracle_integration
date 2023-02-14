import { Router } from '@angular/router';
import { Article, Customer } from './../app.model';
import { Observable, Subscription } from 'rxjs';
import { AppService } from './../app-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DefaultCustomer } from '../app.constant';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  customer = DefaultCustomer;
  cartCount: number;
  sub$: Subscription;
  carts$: Observable<Article[]>;
  selectedCustomer: Customer;
  constructor(private appservice: AppService, private router: Router) {}

  ngOnInit(): void {
    this.sub$ = this.appservice.cart$.subscribe(
      (carts) => (this.cartCount = carts.length)
    );
    this.carts$ = this.appservice.cart$;
  }
  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
  checkOut() {
    this.appservice.checkout(this.selectedCustomer.reservationId).subscribe(res => {
      this.appservice.emptyCart();
      this.router.navigate(['/invoice']);
    })
  }
}
