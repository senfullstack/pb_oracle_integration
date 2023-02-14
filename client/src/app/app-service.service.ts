import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Article, TrxCode } from './app.model';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { environment } from './../environments/environment';
import { HotelId, URI, cashierId, transactionCodes } from './app.constant';

@Injectable({
  providedIn: 'root',
})
export class AppService implements OnInit {
  private cart: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);
  cart$ = this.cart.asObservable();

  private networkLogs: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  networkLogs$ = this.networkLogs.asObservable();

  private authHeaders: BehaviorSubject<any> = new BehaviorSubject<any>({});

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  updateCart(product: Article) {
    const updatedCart = [...this.cart.value, product];
    this.cart.next(updatedCart);
  }

  emptyCart() {
    this.cart.next([]);
  }

  generateOAuth() {
    this.http.post(`${this.apiUrl}/${URI.token}`, {}).subscribe((res: any) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${res.token}`,
      });
      this.authHeaders.next(headers);
    });
  }

  getProducts(): Observable<TrxCode> {
    return this.http
      .get<any>(`${this.apiUrl}/${URI.products}`, {
        headers: this.authHeaders.value,
      })
      .pipe(map((res) => res.data.trxCodes[0]));
  }

  checkout(reservationId: string) {
    const resBody = {
      criteria: {
        hotelId: HotelId,
        charges: this.cart.value.map((cart) => {
          return {
            transactionCode: transactionCodes,
            articleCode: cart.articleCode,
            price: {
              amount: cart.price.amount,
              currencyCode: 'USD',
            },
            postingQuantity: 1,
            postingReference: cart.description,
            postingRemark: cart.description,
            checkNumber: '',
            applyRoutingInstructions: false,
            usePackageAllowance: false,
            autoPosting: true,
            folioWindowNo: 2,
            cashierId: cashierId,
          };
        }),
        reservationId: {
          id: reservationId,
          idExtension: 0,
        },
        incomeAuditDate: '2021-10-05',
        postIt: false,
        cashierId: cashierId,
        welcomeOfferPosting: true,
      },
    };

    return this.http
      .post(
        `${this.apiUrl}/csh/v0/hotels/${HotelId}/reservations/${reservationId}/charges`,
        resBody,
        {
          headers: this.authHeaders.value,
        }
      )
  }

  getInvoice(reservationId: string) {

    return this.http
    .get<any>(`${this.apiUrl}/csh/v1/hotels/${HotelId}/transactions?reservationList=${reservationId}&idContext=OPERA&type=Reservation&cashierId=${cashierId}`, {
      headers: this.authHeaders.value,
    })
    .pipe(map((res) => res.data.reservationFolioInformation[0].folioWindows[0].folios[0].postings));
  }
}