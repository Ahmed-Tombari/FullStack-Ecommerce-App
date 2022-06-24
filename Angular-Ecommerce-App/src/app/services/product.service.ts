import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.shopApiUrl + '/products';
  private categoryUrl = environment.shopApiUrl + '/product-category';

  constructor(private httpClient: HttpClient) { }

  getProductList(theCategoryId: number): Observable<Product[]> {

// need to build URL based on category "id"
const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
   /* return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );*/
  }

  getProductListPaginate(thePage: number, thePageSize: number, theCategoryId:number): Observable<GetResponseProducts> {

    // need to build URL based on category "id" page and size
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                    + `&page=${thePage}&size=${thePageSize}`;

        return this.httpClient.get<GetResponseProducts>(searchUrl);
       /* return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
          map(response => response._embedded.products)
        );*/
      }


// need to build URL based on the "keyword"
searchProducts(theKeyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }


  searchProductsPaginate(thePage: number,
                         thePageSize: number,
                         theKeyword:string): Observable<GetResponseProducts> {

    // need to build URL based on category "id" page and size
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                    + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }


  //need to build URL based on category "name"
  getProductCategories(): Observable<ProductCategory[]> {

    // need to build URL based on category "id"

        return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
          map(response => response._embedded.productCategory)
        );
      }

      getProduct(theProductId: number): Observable<Product>{

        // need to build URL based on category "id"
        const productUrl = `${this.baseUrl}/${theProductId}`;

        return this.httpClient.get<Product>(productUrl);
      }
}
interface GetResponseProducts {
  _embedded: {
  products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

  interface GetResponseProductCategory {
    _embedded: {
      productCategory: ProductCategory[];
    }
  }


