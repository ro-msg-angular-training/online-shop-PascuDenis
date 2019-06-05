import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Address } from './address';
import { OrderInput } from './orderInput';
import { ProductInput } from './productInput';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})


export class CartService {
  orderUrl = 'http://localhost:8080/order';
  orderProducts: ProductInput[] = [];
  address: Address;
  inputOrder: OrderInput;

  addToCart(productId: number, productQuantity: number) {
    if (productQuantity < 1) {
      console.log("quantity must not be zero!");
      alert("quantity must not be zero!")
      return;
    }

    console.log(productId + "    " + productQuantity);
    this.orderProducts.push(new ProductInput(productId, productQuantity));
    console.log(this.orderProducts);
  }

  constructor(
    private http: HttpClient
  ) { }

  createOrder() {
    if (this.orderProducts.length === 0) {
      console.log("a product was not selected");
      alert("a product was not selected")
      return;
    }

    this.address = new Address(
      1,
      "AddressCountry01",
      "AddressCity01",
      "AddressCounty01",
      "AddressStreetAddress01"
    );

    this.inputOrder = new OrderInput(
      this.address,
      this.orderProducts
    );

    console.log(this.inputOrder);
    let orderToBePlaced = this.inputOrder;

    this.http.post<OrderInput>(this.orderUrl, orderToBePlaced)
      .subscribe((response) => {
      }, (error1) => {
        console.log(error1);
      });
  }
}
