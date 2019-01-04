import { LoginAuthGuard } from './services/login-auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { RouterModule } from '@angular/router'; 
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    OrderSuccessComponent,
    UserOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '', component: HomeComponent
      },
      {
        path: 'products', component: ProductsComponent
      },
      {
        path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]
      },
      {
        path: 'orders', component: UserOrdersComponent, canActivate: [AuthGuard]
      },
      {
        path: 'shopping-cart', component: ShoppingCartComponent
      },
      {
        path: 'admin/products', component: AdminProductsComponent
      },
      {
        path: 'admin/orders', component: AdminOrdersComponent
      },
      {
        path: 'login', component: LoginComponent, canActivate: [LoginAuthGuard]
      },
      {
        path: "**", component: NotFoundComponent
      }
  ])
  ],
  providers: [
    AuthService,
    AuthGuard,
    LoginAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
