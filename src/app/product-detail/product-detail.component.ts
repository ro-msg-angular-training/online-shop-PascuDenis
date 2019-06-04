import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { ProductService } from '../product.service';
import { Product } from '../product';
import { Category } from '../category';
import { Supplier } from '../supplier';
import { async } from '@angular/core/testing';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @ViewChild('productForm') public productDetailsForm: NgForm;

  form: FormGroup;

  product: Product;
  category: Category;
  supplier: Supplier;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location,
    private http: HttpClient,
    private router: Router
    // private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.getProduct();
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getCategories();
    this.getSuppliers();

    // this.form = this.formBuilder.group({
    //   name: [null, [Validators.required]]
    // });
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

  submitted = false;

  onSubmit() {
    this.submitted = true;
  }

  getProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.productService.getProduct(id)
      .subscribe(product => this.product = product);
    console.log(" " + this.product);
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


  public addProduct(productId: number, productName: string, productDescription: string, productPrice: number, productWeight: number, productCategoryId: number, productSupplierId: number) {
    const product = new Product();
    product.id = productId;
    product.name = productName;
    product.description = productDescription;
    product.price = productPrice;
    product.weight = productWeight;
    product.productCategoryId = productCategoryId;
    product.supplierId = productSupplierId;

    console.log("alalaa" + productName);
    console.log(product.id);
    console.log(productName);
    console.log(product.description);
    console.log(product.price);
    console.log(product.weight);
    console.log(product.productCategoryId);
    console.log(product.supplierId);

    // this.productService.addProduct(product);
    // this.goBack();

    this.http.post<Product>('http://localhost:8080/product/save', product)
      .subscribe((response) => {
        this.error = false;
        this.goBack();
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

  public updateProduct(productName: string, productDescription: string, productPrice: number, productWeight: number, productCategoryId: number, productSupplierId: number) {
    const product = new Product();
    var productId = +this.route.snapshot.paramMap.get('id');
    product.id = productId;
    product.name = productName;
    product.description = productDescription;
    product.price = productPrice;
    product.weight = productWeight;
    product.productCategoryId = productCategoryId;
    product.supplierId = productSupplierId;

    console.log(product.id);
    console.log(productName);
    console.log(product.description);
    console.log(product.price);
    console.log(product.weight);
    console.log(product.productCategoryId);
    console.log(product.supplierId);
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

  getCategoryById(id: number): void {
    console.log("pc - getCategoryById")
    console.log(id)

    this.productService.getCategoryById(id)
      .subscribe(category => {
        this.category = category;
        // this.idCategory = category.id;
        // this.nameCategory = category.name;
        // console.log(this.idCategory + "  " + this.nameCategory  )
      });
    console.log(this.productService.getCategoryById(id))
    console.log(" " + this.category);
  }

  getSupplierById(id: number): void {
    console.log("pc - getSupplierById")
    console.log(id)

    this.productService.getSupplierById(id)
      .subscribe(supplier => {
        this.supplier = supplier;
        // this.idSupplier = supplier.id;
        // this.nameSupplier = supplier.name;
        // console.log(this.idSupplier + "  " + this.nameSupplier  )
      });
    console.log(this.productService.getSupplierById(id))
    console.log(" " + this.supplier);
  }
}
