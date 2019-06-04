import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Address } from './address';
import { OrderInput } from './orderInput';

var inputProductList: Array<{id: number, quantity: number }> = [];

// inputProductList = [{ address: address, id: 1, quantity: 1 }];

var orderInput: OrderInput;

@Injectable({
  providedIn: 'root'
})  


export class CartService {


  constructor(
    private http: HttpClient  
    ) { }

  createOrder(productId: number, productQuantity: number): void {
    var address: Address = {
      id: 1,
      country: "AddressCountry01",
      city: "AddressCity01",
      county: "AddressCounty01",
      street: "AddressStreetAddress01"
    }

    console.log(productId + "    " + productQuantity);
    inputProductList.push({id: productId, quantity: productQuantity });
    console.log(inputProductList);

    console.log(address);
    // orderInput.productAddress = add;

    // orderInput.productAddress = address;
    // orderInput.productInputList = inputProductList;

    // console.log(this.orderInput);
    // this.http.post<Product>('http://localhost:8080/product/save', product)
    // .subscribe((response) => {
    //   this.error = false;
    //   this.goBack();
    // }, (error1) => {
    //   this.error = true;
    //   this.errorMessage = error1.error.message;
    //   console.log(error1);
    // });
    
  }
}
