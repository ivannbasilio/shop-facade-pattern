import { Injectable } from '@angular/core';
import { Product } from '../../../models/Product';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ProductState {
    private static instance: ProductState;

    private constructor() { }

    public static getInstance(): ProductState {
        if (!ProductState.instance) {
            ProductState.instance = new ProductState();
        }
        return ProductState.instance;
    }

    private productsCache$ = new BehaviorSubject<Product[]>([])

    setProductsCache$(products: Product[]) {
        this.productsCache$.next(products)
    }

    getProductsCache$(): Observable<Product[]> {
        return this.productsCache$.asObservable()
    }
}
