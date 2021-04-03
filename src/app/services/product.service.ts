import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductCategory } from '../model/product-category';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private productUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/productCategory';


  constructor(private httpClient: HttpClient) { }

  getProductListPaginate(page: number, 
                        size: number, 
                        categoryId: number): Observable<GetResponseProduct> {
                          
    const searchUrl = `${this.productUrl}/search/byCategoryId?categoryId=${categoryId}` +
                      `&page=${page}&size=${size}`;
                      
    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }

  getProductDetail(productId: number) {
    return this.httpClient.get<Product>(`${this.productUrl}/search/${productId}`);
  }


  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<ProductCategory[]>(this.categoryUrl);
  }

  searchProducts(page: number, 
              size: number, 
              keyword: string): Observable<GetResponseProduct> {

    const searchUrl =  `${this.productUrl}/search/byName?name=${keyword}&page=${page}&size=${size}`;
    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }

}

interface GetResponseProduct {
  content: Product[];
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
  
}