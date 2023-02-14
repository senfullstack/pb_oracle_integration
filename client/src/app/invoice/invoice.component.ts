import { Observable, map, Subscription } from 'rxjs';
import { AppService } from './../app-service.service';
import { DefaultCustomer } from './../app.constant';
import { Customer } from './../app.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  customer = DefaultCustomer;
  selectedCustomer: Customer;
  sub$ = new Subscription();

  displayedColumns: string[] = ['transactionNo',  'postingDate', 'transactionAmount', 'reference'];
  dataSource$: Observable<any[]>;
  dataSource = [];
  
  constructor(private appservice: AppService) {}

  ngOnInit(): void {}

  onSelectCustomer(value: Customer) {
    this.selectedCustomer = value;
    this.sub$  = this.appservice.getInvoice(
      this.selectedCustomer.reservationId
    ).subscribe(data => this.dataSource = data)
  }
}
