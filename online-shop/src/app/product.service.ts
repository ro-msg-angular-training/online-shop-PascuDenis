import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from './product';
import { catchError, map, tap } from 'rxjs/operators';
import { Category } from './category';
import { Supplier } from './supplier';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient) { }

  getProduct(id: number): Observable<Product> {
    const url = 'http://localhost:8080/products/' + id;
    console.log(url);
    return this.http.get<Product>(url).pipe(
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }

  getCategoryById(id: number):Observable<Category>{
    console.log("service - getCategoryById")
    console.log(id)
    const url = 'http://localhost:8080/categories/' + id;

    return this.http.get<Category>(url).pipe(
      catchError(this.handleError<Category>(`getCategoty id=${id}`))
    );
  }

  getSupplierById(id: number):Observable<Supplier>{
    console.log("service - getSupplierById")
    console.log(id)
    const url = 'http://localhost:8080/supplier/' + id;

    return this.http.get<Supplier>(url).pipe(
      catchError(this.handleError<Supplier>(`getSupplier id=${id}`))
    );
  }

  /** GET products from the server */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/products')
      .pipe(
        catchError(this.handleError<Product[]>('getProducts', []))
      );
  }


  searchProduct(term: string): Observable<Product[]> {
    if (!term.trim()) {
      // if not search term, return empty product array.
      return of([]);
    }
    return this.http.get<Product[]>(`${'http://localhost:8080/products'}/?name=${term}`).pipe(
      catchError(this.handleError<Product[]>('searchProduct', []))
    );
  }

  /** POST: add a new product to the server */
  addProduct(product: Product): Observable<Product> {
    console.log("lalalalalalalalal"); 
    console.log(product); 
    return this.http.post<Product>('http://localhost:8080/product/save', product, httpOptions).pipe(
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  /** DELETE: delete the product from the server */
  deleteProduct(product: Product | number): Observable<Product> {
    const id = typeof product === 'number' ? product : product.id;
    const url = `${'http://localhost:8080/product/remove/'}/${id}`;

    return this.http.delete<Product>(url, httpOptions).pipe(
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }

  /** PUT: update the product on the server */
  updateProduct(product: Product): Observable<any> {
    return this.http.put('http://localhost:8080/product/update/', Product, httpOptions).pipe(
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
