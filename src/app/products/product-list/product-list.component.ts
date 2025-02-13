import { Component, inject } from '@angular/core';
import { Product } from '../../models/product.interface';
import { AsyncPipe, CurrencyPipe, SlicePipe, UpperCasePipe } from '@angular/common';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../../services/product.service';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [SlicePipe, AsyncPipe, CurrencyPipe, UpperCasePipe, ProductDetailComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  title: string = 'Products'
  selectedProduct: Product
  errorMessage: string

  // Pagination
  pageSize = 5
  start = 0
  end = this.pageSize
  pageNumber = 1

  previousPage() {
    this.start -= this.pageSize
    this.end -= this.pageSize
    this.pageNumber--
    this.selectedProduct = null
  }

  nextPage() {
    this.start += this.pageSize
    this.end += this.pageSize
    this.pageNumber++
    this.selectedProduct = null
  }

  private productService = inject(ProductService)
  private router = inject(Router)

  onSelect(product: Product) {
    this.selectedProduct = product
    this.router.navigateByUrl('/products/' + product.id)
  }

  products$: Observable<Product[]> = this
                                      .productService
                                      .products$
                                      .pipe(
                                        catchError(
                                          errMsg => {
                                            this.errorMessage = errMsg
                                            return EMPTY
                                          }
                                        )
                                      )
}
