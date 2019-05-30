import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from './product';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // constructor(private http: HttpClient) { }
  // /* Uses http.get() to load data from a single API endpoint */
  // getProducts() {
  //   return this.http.get('http://localhost:8080/products');
  // }
  private productUrl = '/products';  // URL to web api

  constructor(
    private http: HttpClient) { }

  getProduct(id: number): Observable<Product> {
    const url = 'http://localhost:8080/products/' + id;
    console.log(url);
    return this.http.get<Product>(url).pipe(
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }
  
  // loadProducts(id: number):Observable<Product>{
  //   this.http.get('http://localhost:8080/product/' + id, this.httpOptions)
  //   .subscribe((response) => {
  //   this.products = response as Product[];
  // }, (error) => {
  //   console.log(error);
  // });
  // }

  /** GET products from the server */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl)
      .pipe(
        catchError(this.handleError<Product[]>('getProducts', []))
      );
  }

  searchProduct(term: string): Observable<Product[]> {
    if (!term.trim()) {
      // if not search term, return empty product array.
      return of([]);
    }
    return this.http.get<Product[]>(`${this.productUrl}/?name=${term}`).pipe(
      catchError(this.handleError<Product[]>('searchProduct', []))
    );
  }

  /** POST: add a new product to the server */
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productUrl, product, httpOptions).pipe(
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  /** DELETE: delete the product from the server */
  deleteProduct(product: Product | number): Observable<Product> {
    const id = typeof product === 'number' ? product : product.id;
    const url = `${this.productUrl}/${id}`;

    return this.http.delete<Product>(url, httpOptions).pipe(
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }

  /** PUT: update the product on the server */
  updateProduct(product: Product): Observable<any> {
    return this.http.put(this.productUrl, Product, httpOptions).pipe(
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead


      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
