import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

const authRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin/products/:id', component: ProductDetailComponent }
];


@NgModule({
  imports: [
    RouterModule.forRoot(authRoutes), CommonModule
  ],
  exports: [
    RouterModule
  ]
})

export class AuthRoutingModule { }