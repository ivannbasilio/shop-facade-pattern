import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { CartApi } from '../api/cart.api';
import { CartState } from '../state/cart.state';

@Injectable({ providedIn: 'root' })
export class CartService {
    private subs: Subscription[] = []
    private cartState: CartState | null
    
    constructor(private cartApi: CartApi) {
        this.cartState = CartState.getInstance()
    }

    private getProductList(): Product[] {
        return this.cartState?.cartSubject$.getValue() || []
    }

    addToCart(product: Product) {
        let list = this.getProductList()

        let exists
        list.forEach(entry => exists = entry.id == product.id)
        
        if (!exists) {
            list.unshift(product)
        }
        this.cartState?.setCart$(list)
    }

    removeFromCart(productId: string) {
        let list = this.getProductList()

        let product
        list.forEach(entry => product = entry.id == productId ? entry : undefined)

        if (product) {
            const index = list.indexOf(product);
            if (index > -1) { 
                list.splice(index, 1); 
            }
        }
        this.cartState?.setCart$(list)
    }

    getCart() { 
        return this.cartState?.getCart$() 
    }

    checkout(uid: string) {
        let response = this.cartApi.checkout({
            id: 'pTanRLz91yQr1BkhmvOFsJeEiXK7GcoZ',
            uid: uid,
            products: this.getProductList(),
            created: new Date(),
        })

        this.subs.push(response.subscribe({
            next: (res) => {
                this.cartState?.setClearCart$(res.success)
            },
            error: () => {
                this.cartState?.setClearCart$(false)
            }
        }))
        return response
    }

    clearCheckout() {
        this.cartState?.setCart$([])
        this.cartState?.setClearCart$(true)
    }

    getClearCheckout() {
        return this.cartState?.getClearCart$()
    }

    destroy() {
        this.subs.forEach(sub => sub.unsubscribe())
    }
}
