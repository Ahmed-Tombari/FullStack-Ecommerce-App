import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
// ------------------------ okta ----------------------------- //
import { Injector } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import {
  OKTA_CONFIG,
  OktaAuthGuard,
  OktaAuthModule,
  OktaCallbackComponent,
} from '@okta/okta-angular';
import { environment } from '../environments/environment';

import { OktaAuth } from '@okta/okta-auth-js';
import config from './config/my-app-config';
import { MembersPageComponent } from './components/members-page/members-page.component';
import { OktaComponent } from './okta/okta.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';

const routes: Routes = [
   // {path: 'category/:id', component:ProductListComponent},
 //  {path: '', component:LoginComponent},

   {
    path: 'login/callback',
    component: OktaCallbackComponent,
  },

  {path: 'checkout', component:CheckoutComponent},
    {path: 'search/:keyword', component:ProductListComponent},
    {path: 'category/:id/:name', component:ProductListComponent},
    {path: 'products/:id', component:ProductDetailsComponent},
    {path: 'category', component:ProductListComponent},
    {path: 'cart-details', component:CartDetailsComponent},
    {path: 'products', component:ProductListComponent},
    {path: 'members', component:MembersPageComponent,  canActivate: [ OktaAuthGuard ]},
    {path: 'order-history', component:OrderHistoryComponent,  canActivate: [ OktaAuthGuard ]},

    {path: '', redirectTo:'/products', pathMatch: 'full'},
    {path: '**', redirectTo:'/products', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    MembersPageComponent,
    OktaComponent,
    OrderHistoryComponent,

  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule,





  ],
  providers: [ProductService, {
    provide: OKTA_CONFIG,
    useFactory: () => {
      const oktaAuth = new OktaAuth(config.oidc);
      return {
        oktaAuth,
        onAuthRequired: (oktaAuth: OktaAuth, injector: Injector) => {
          const triggerLogin = async () => {
            await oktaAuth.signInWithRedirect();
          };
          if (!oktaAuth.authStateManager.getPreviousAuthState()?.isAuthenticated) {
            // App initialization stage
            triggerLogin();
          } else {

          }
        }
      }
    }
  },

  { provide: APP_BASE_HREF, useValue: environment.appBaseHref },
  //{ provide: OKTA_CONFIG, useValue: config },
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
// {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
