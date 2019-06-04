import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductSearchComponent } from './product-search/product-search.component';

import { AppRoutingModule } from './app-routing.module';
import { ProductDetailsCanDeactivateGuard } from './product-details-can-deactivate-guard.service';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { AdminComponent } from './admin/admin/admin.component';
import { AdminRoutingModule } from './admin/admin-routing.module';

// import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
// import { MatButtonModule, MatCheckboxModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductDetailComponent,
    ProductSearchComponent,
    LoginComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AuthRoutingModule,
    AdminRoutingModule
    // BrowserAnimationsModule,
    // NoopAnimationsModule,
    // MatButtonModule,
    // MatCheckboxModule
  ],
  
  providers: [ProductDetailsCanDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule {

}