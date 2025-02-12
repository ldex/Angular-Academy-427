import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, delay, throwError } from 'rxjs';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() {
    this.initProducts()
  }

  private baseUrl = 'https://671d383409103098807c943e.mockapi.io/api/products/';
  private http = inject(HttpClient)

  products$: Observable<Product[]>

  initProducts() {
    this.products$ = this
                        .http
                        .get<Product[]>(this.baseUrl)
                        .pipe(
                          delay(1500), // just for the demo!!
                          catchError(
                            error => {
                              let errorMessage = 'Error while loading products!' + error.message
                              console.log(errorMessage)
                              return throwError(() => errorMessage)
                            }
                          )
                        )
  }
}
