import { Component, OnInit, OnDestroy } from '@angular/core';
import { FacadeService } from '../../../../shared/facade.service';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/models/Product';

@Component({
    selector: 'products',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
    private subs: Subscription[] = []
    products$: Observable<Product[]> | undefined

    constructor(private facade: FacadeService) { }

    ngOnInit() { 
       this.getAllProducts() 
       this.getClearCheckoutEvent()
    }

    getAllProducts() {
        this.products$ = this.facade.getAllProducts()
    }

    roundValue(price: number) {
        return Math.ceil(price)
    }

    addToCart(product: Product) {
        product.selected = true
        this.facade.addToCart(product)
    }

    removeFromCart(product: Product) {
        product.selected = false
        this.facade.removeToCart(product.id)
    }

    getClearCheckoutEvent() {
        let subscription = this.facade.getClearCheckout()?.subscribe(status => {
            if (status) {
                this.products$ = this.facade.getProductsCache()
            }
        })
        if (subscription) {
            this.subs.push(subscription)
        }
    } 

    ngOnDestroy(): void {
        this.subs.forEach(sub => sub.unsubscribe())
        this.facade.destroy()
    }
}
