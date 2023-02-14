import {  Subscription } from 'rxjs';
import { AppService } from './app-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  cartCount: number;
  sub$: Subscription;
  constructor(private appService: AppService, private router: Router) {}

  ngOnInit(): void {
    this.router.navigate(['/']);
    this.appService.generateOAuth();
    this.sub$ = this.appService.cart$.subscribe(carts => this.cartCount = carts.length)
  }
ngOnDestroy(): void {
  this.sub$.unsubscribe();
}
  
}
