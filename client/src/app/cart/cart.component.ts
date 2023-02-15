import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Article, Customer, Guest } from './../app.model';
import { Observable, Subscription, mergeMap, of, tap } from 'rxjs';
import { AppService } from './../app-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DefaultCustomer } from '../app.constant';
import {MatSnackBar} from '@angular/material/snack-bar';

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

  roomNoController = new FormControl("", [Validators.required]);
  surNameController = new FormControl("");
  isProgress = false;
  guest: Guest ={}
  guestFound: boolean = false
  constructor(private appservice: AppService, private router: Router, private snackBar: MatSnackBar) {}

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
    this.appservice.checkout(this.guest.reservationId as string).subscribe(res => {
      this.appservice.emptyCart();
      this.snackBar.open(`Successfully Charged to ${this.guest.givenName}`, ' ' , {duration: 5000});
      this.guestFound = false;
      this.guest = {}
    })
  }

  onGuestSearch() {
    this.isProgress = true;
    this.guestFound = false;
    const guest: Guest = {
      roomId: this.roomNoController.value as string,
      surname: this.surNameController.value as string,
    };
    this.appservice
      .searchGuest(guest).subscribe(guest => {
        this.guest = guest;
        console.log(guest.reservationId)
        if(guest.reservationId) {
          this.guestFound = true;
        }
        this.isProgress = false;
       
      })
  }


}
