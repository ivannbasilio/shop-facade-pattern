import { Injectable, Injector } from '@angular/core';
import { CartService } from '../components/cart/service/cart.service';
import { ProductService } from '../components/products/service/product.service';
import { Product } from '../models/Product';

@Injectable({ providedIn: 'root' })
export class FacadeService {

    constructor(private injector: Injector) { }

    private _productService: ProductService | undefined;
	public get productService(): ProductService {
		if(!this._productService){
		this._productService = this.injector.get(ProductService);
		}
		return this._productService;
	}

    private _cartService: CartService | undefined;
	public get cartService(): CartService {
		if(!this._cartService){
		this._cartService = this.injector.get(CartService);
		}
		return this._cartService;
	}

    getAllProducts() {
        return this.productService.getAllProducts()
    }

    getProductsCache() {
        return this.productService.getProductsCache()
    }

    // Cart

    addToCart(product: Product) {
        return this.cartService.addToCart(product)
    }

    removeToCart(productId: string) {
        return this.cartService.removeFromCart(productId)
    }

    getCart() {
        return this.cartService.getCart()
    }

    checkout(uid: string) {
        return this.cartService.checkout(uid)
    }

    clearCheckout() {
        this.cartService.clearCheckout()
    }

    getClearCheckout() {
        return this.cartService.getClearCheckout()
    }

    destroy() {
        this.productService.destroy()
        this.cartService.destroy()
    }
}
