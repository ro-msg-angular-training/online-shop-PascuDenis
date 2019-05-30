import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];

  id: number;
  name: string;
  description: string;
  price: number;
  weight: number;
  productCategoryId: number;
  supplierId: number;

  error = false;
  errorMessage = '';

  selectedProduct: Product;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(): void {
    console.log("pc - loadProducts")
    this.http.get('http://localhost:8080/products', this.httpOptions)
      .subscribe((response) => {
        this.products = response as Product[];
      }, (error) => {
        console.log(error);
      });
  }

  onSelect(product: Product): void {
    this.selectedProduct = product;
  }
}
