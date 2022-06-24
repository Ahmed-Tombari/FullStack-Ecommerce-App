import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  currentCategoryName: string;
  searchMode: boolean = false;

  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 6;
  theTotalElements: number = 0;

  previousKeyword: string = null;


  constructor(private productService: ProductService, private route: ActivatedRoute,private cartService: CartService) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });

  }

listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleListSearchProducts();
    }
    else {
      this.handleListProducts();
    }
  }
handleListSearchProducts() {

  const theKeyword: string = this.route.snapshot.paramMap.get('keyword');

// if we have a different keyword than previous
// then set thePageNumber to 1

if (this.previousKeyword != theKeyword) {
  this.thePageNumber = 1;
}

this.previousKeyword = theKeyword;

console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);

  // search for the products using keyword

  this.productService.searchProductsPaginate(this.thePageNumber - 1,
                                             this.thePageSize,
                                             theKeyword).subscribe(this.processResult());

 /* this.productService.searchProducts(theKeyword).subscribe(
    data => {
      this.products = data;
    }
  )*/

}

handleListProducts() {

    //chek if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    console.log(hasCategoryId);
    /*if (hasCategoryId){
      //get the "id" param string. convert to a number using the "+" symbol

      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
      console.log( this.currentCategoryId);
    }
    else {

      // not gategory "id" available ... default to category id 1
      this.currentCategoryId = 1;
    }*/

    // new if() formation****************************************
    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
      console.log( this.currentCategoryId);
      // get the "name" param string
      this.currentCategoryName = this.route.snapshot.paramMap.get('name');
      console.log( this.currentCategoryName);
    }
    else {
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';
    }

    //
    // Check if we have a different category than previous
    // Note: Angular will reuse a component if it is currently being viewed
    //
    // if we have a different category id than previous
    // than set thePageNumber back to 1
    if(this.previousCategoryId != this.currentCategoryId) {
       this.thePageNumber = 1;
    }

     this.previousCategoryId = this.currentCategoryId;
     console.log(`currentCategoryId=${this.currentCategoryId}, this.thePageNumber=${ this.thePageNumber}`)

    // get products for the given category "id"

    this.productService.getProductListPaginate(this.thePageNumber - 1,
                                               this.thePageSize,
                                               this.currentCategoryId)
                                               .subscribe(this.processResult());
    }
    processResult() {
      return data => {
        this.products = data._embedded.products;
        this.thePageNumber = data.page.number + 1;
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements;
      };
    }

     /*  this.productService.getProductList(this.currentCategoryId).subscribe(
        data => {
          this.products = data;
        }
     )
  }*/
  updatePageSize(pageSize: number) {
            this.thePageSize = pageSize;
            this.thePageNumber = 1;
            this.listProducts();
  }

  addToCart(theProduct: Product) {
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`)

     // TODO ... dothe real work
     const theCartItem = new CartItem(theProduct);

     this.cartService.addToCart(theCartItem);
  }
}
