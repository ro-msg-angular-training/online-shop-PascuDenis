import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsCanDeactivateGuard } from './product-details-can-deactivate-guard.service';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },

  {
    path: 'products',
    component: ProductsComponent
  },
  
  { path: 'login', component: LoginComponent },
  // { path: 'products/:id', component: ProductDetailComponent }

  {
    path: 'admin/products/:id',
    component: ProductDetailComponent, 
    canDeactivate: [ProductDetailsCanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
