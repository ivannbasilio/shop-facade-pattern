import { Component, OnInit, OnDestroy } from '@angular/core';
import { FacadeService } from '../../../shared/facade.service';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { Checkout } from '../../../models/Checkout';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {
    uid: string = 'U6sc3IKSojgVMNkCSqDt7mFkdkPcjs7V'
    subs: Subscription[] = []
    cart$: Observable<Product[] | null> | undefined
    results$: Observable<Product[] | null> | undefined

    constructor(private facade: FacadeService) { }

    ngOnInit() { 
        this.cart$ = this.facade.getCart()
    }

    checkout() {
        this.subs.push(this.facade.checkout(this.uid).subscribe(res => {
            // sucesso
            this.facade.clearCheckout()
        }))
    }

    clearCheckout() {
        this.facade.clearCheckout()
    }

    computeTotal(products: Product[]) {
        let total = 0
        products.forEach(product => total = total + product.price)
        
        return total
    }

    ngOnDestroy() {
        this.subs.forEach(sub => sub.unsubscribe())
        this.facade.destroy()
    }
}
