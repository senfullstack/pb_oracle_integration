import { Observable } from 'rxjs';
import { AppService } from './../app-service.service';
import { Component, OnInit } from '@angular/core';
import { DefaultProducts } from './products.constant';
import { Article, Products, TrxCode } from '../app.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products$: Observable<TrxCode>;
  constructor(private appService: AppService) {}

  ngOnInit() {
    this.products$ = this.appService.getProducts();
  }

  onAddCart(articles: Article) {
    this.appService.updateCart(articles);
  }
}
