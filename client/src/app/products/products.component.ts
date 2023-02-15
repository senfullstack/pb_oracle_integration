import { Observable } from 'rxjs';
import { AppService } from './../app-service.service';
import { Component, OnInit } from '@angular/core';
import { Article, TrxCode } from '../app.model';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products$: Observable<TrxCode>;
  constructor(private appService: AppService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.products$ = this.appService.getProducts();
  }

  onAddCart(articles: Article) {
    this.appService.updateCart(articles);
    this.snackBar.open(articles.description, 'Added to cart!' , {duration: 5000});
  }
}
