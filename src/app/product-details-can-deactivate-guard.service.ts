import { CanDeactivate } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductDetailsCanDeactivateGuard implements CanDeactivate<ProductDetailComponent> {
    canDeactivate(component: ProductDetailComponent): boolean {
        if (component.productDetailsForm.dirty) {
            return confirm('Are you sure you want to discard your changes?');
        }
        return true;
    }
}
