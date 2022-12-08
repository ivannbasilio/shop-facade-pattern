import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductApi } from '../api/product.api';
import { ProductState } from '../state/product.state';

@Injectable({ providedIn: 'root' })
export class ProductService {
    private subs: Subscription[] = []
    private productState: ProductState

    constructor(private productsApi: ProductApi) { 
        this.productState = ProductState.getInstance()
    }

    getAllProducts() {
        let observable = this.productsApi.getAllProducts()
        this.subs.push(observable.subscribe(
            data => this.productState.setProductsCache$(data)))

        return observable
    }

    getProductsCache() {
        return this.productState.getProductsCache$()
    }

    destroy() {
        this.subs.forEach(sub => sub.unsubscribe())
    }
}
