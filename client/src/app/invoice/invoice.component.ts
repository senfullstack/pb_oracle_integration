import { Observable, Subscription, mergeMap, of, tap } from "rxjs";
import { AppService } from "./../app-service.service";
import { DefaultCustomer } from "./../app.constant";
import { Guest } from "./../app.model";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-invoice",
  templateUrl: "./invoice.component.html",
  styleUrls: ["./invoice.component.scss"],
})
export class InvoiceComponent implements OnInit {
  customer = DefaultCustomer;
  sub$ = new Subscription();
  guest: Guest;
  isProgress = false;

  displayedColumns: string[] = [
    "transactionNo",
    "postingDate",
    "transactionAmount",
    "reference",
  ];
  dataSource$: Observable<any[]>;
  dataSource = [];

  roomNoController = new FormControl("", [Validators.required]);
  surNameController = new FormControl("");

  constructor(private appservice: AppService) {}

  ngOnInit(): void {}

  onGuestSearch() {
    this.isProgress = true;
    const guest: Guest = {
      roomId: this.roomNoController.value as string,
      surname: this.surNameController.value as string,
    };
    this.appservice
      .searchGuest(guest)
      .pipe(
        tap((guest: Guest) => (this.guest = guest)),
        mergeMap((guest) => {
          if (!guest?.reservationId) {
            this.isProgress = false;
            return of([]);
          }
          return this.appservice.getInvoice(guest.reservationId as string);
        })
      )
      .subscribe((data) => {
        this.dataSource = data;
        this.isProgress = false;
      });
  }
}
