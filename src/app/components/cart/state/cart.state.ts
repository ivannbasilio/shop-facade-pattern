import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/Product';

@Injectable()
export class CartState {
    private static instance: CartState;

    private constructor() { }

    public static getInstance(): CartState {
        if (!CartState.instance) {
            CartState.instance = new CartState();
        }
        return CartState.instance;
    }

    cartSubject$ = new BehaviorSubject<Product[]>([])

    setCart$(products: Product[]) {
        this.cartSubject$.next(products)
    }

    getCart$() {
        return this.cartSubject$.asObservable()
    }

    private clearCartSubject$ = new BehaviorSubject<boolean>(false)
    
    setClearCart$(cleaned: boolean) {
        this.clearCartSubject$.next(cleaned)
    }

    getClearCart$() {
        return this.clearCartSubject$.asObservable()
    }
}
