import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { ProductService } from '../product.service';
import { Product } from '../product';
import { Category } from '../category';
import { Supplier } from '../supplier';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getProduct();
    this.id = +this.route.snapshot.paramMap.get('id'); 
    this.getCategories();
    this.getSuppliers();
    // console.log("haha"); 
    // this.product = this.productService.getProduct(+this.route.snapshot.paramMap.get('id'))[0];
    // console.log("lalala  " + this.productService.getProduct(this.id)[0]);
  }

  products: Product[];
  id: number;
  name: string;
  description: string;
  price: number;
  weight: number;
  productCategoryId: number;
  supplierId: number;
  imageUrl: string;

  categories: Category[]; 
  idCategory: number;
  nameCategory: string;

  suppliers: Supplier[];
  idSupplier: number;
  nameSupplier: string;


  error = false;
  errorMessage = '';

  getProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.productService.getProduct(id)
      .subscribe(product => this.product = product);
    console.log(" " + this.product)
  }

  getCategories(): void {
    console.log("pc - getCategories")
    this.http.get('http://localhost:8080/categories')
      .subscribe((response) => {
        this.categories = response as Category[];
      }, (error) => {
        console.log(error);
      });
  }

  getSuppliers(): void {
    console.log("pc - getSuppliers")
    this.http.get('http://localhost:8080/suppliers')
      .subscribe((response) => {
        this.suppliers = response as Supplier[];
      }, (error) => {
        console.log(error);
      });
  }

  goBack(): void {
    this.location.back();
  }

  public addProduct() {
    const product = new Product();
    product.id = this.id;
    product.name = this.name;
    product.description = this.description;
    product.price = this.price;
    product.weight = this.weight;
    product.productCategoryId = this.productCategoryId;
    product.supplierId = this.supplierId;

    console.log(product.id);
    console.log(product.name);
    console.log(product.description);
    console.log(product.price);
    console.log(product.weight);
    console.log(product.productCategoryId);
    console.log(product.supplierId);

    this.http.post<Product>('http://localhost:8080/product/save', product)
      .subscribe((response) => {
        this.error = false;
      }, (error1) => {
        this.error = true;
        this.errorMessage = error1.error.message;
        console.log(error1);
      });
  }


  public removeProduct() {
    var productId = +this.route.snapshot.paramMap.get('id');
    console.log(+this.route.snapshot.paramMap.get('id'));
    console.log(productId);
    this.http.delete("http://localhost:8080/product/remove/" + productId)
      .subscribe((response) => {
        this.error = false;
        this.goBack();
      }, (error1) => {
        this.error = true;
        this.errorMessage = error1.error.message;
        console.log(error1);
      });
  }

  public updateProduct() {
    const product = new Product();
    var productId = +this.route.snapshot.paramMap.get('id');
    product.id = productId;
    product.name = this.name;
    product.description = this.description;
    product.price = this.price;
    product.weight = this.weight;
    product.productCategoryId = this.productCategoryId;
    product.supplierId = this.supplierId;
    this.http.put('http://localhost:8080/product/update/' + productId, product).
      subscribe((response) => {
        this.error = false;
        this.goBack();
      }, (error1) => {
        this.error = true;
        this.errorMessage = error1.error.message;
        console.log(error1);
      });
  }

}
