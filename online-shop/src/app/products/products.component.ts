import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  // product: Product ={ 
  //   id: 1, 
  //   name: "Name01", 
  //   description: "Description01", 
  //   price: 200, 
  //   weight: 20, 
  //   // productcategory: null, 
  //   // supplier: null,
  //   imageUrl: "img"}

    products: Product[];
    id: number;
    name: string;
    description: string;
    price: number;
    weight: number;
    productCategoryId: number;
    supplierId: number;
    imageUrl: string;
    
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

    loadProducts(){
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
    public addProduct() {
      const product = new Product();
      product.id = this.id;
      product.name = this.name;
      product.description = this.description;
      product.price = this.price;
      product.weight = this.weight;
      product.productCategoryId = this.productCategoryId;
      product.supplierId = this.supplierId;
      product.imageUrl = this.imageUrl;
      this.http.post<Product>('http://localhost:8080/product/save', product)
      .subscribe((response) => {
        this.error = false;
        this.loadProducts();
      }, (error1) => {
        this.error = true;
        this.errorMessage = error1.error.message;
        console.log(error1);
      });
    }
    public removeProduct(){
      var productId = this.id;
      console.log(this.id);
      console.log(productId);
      this.http.delete("http://localhost:8080/product/remove/" + this.id)
      .subscribe((response) => {
        this.error = false;
        this.loadProducts();
      }, (error1) => {
        this.error = true;
        this.errorMessage = error1.error.message;
        console.log(error1);
      });
    }

    public updateProduct() {
      const product = new Product();
      product.id = this.id;
      product.name = this.name;
      product.description = this.description;
      product.price = this.price;
      product.weight = this.weight;
      product.productCategoryId = this.productCategoryId;
      product.supplierId = this.supplierId;
      product.imageUrl = this.imageUrl;
      this.http.put('http://localhost:8080/product/update/' + this.id, product).
      subscribe((response) => {
        this.error = false;
        this.loadProducts();
      }, (error1) => {
        this.error = true;
        this.errorMessage = error1.error.message;
        console.log(error1);
      });
    }  
}
