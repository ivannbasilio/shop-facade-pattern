import { Component, OnInit } from '@angular/core';
import { FacadeService } from '../../../shared/facade.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/Product';

@Component({
    selector: 'pop-up',
    templateUrl: './pop-up.component.html',
    styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
    cart$: Observable<Product[] | null> | undefined

    constructor(private facade: FacadeService) { }

    ngOnInit() { 
        this.cart$ = this.facade.getCart()
    }

    clearCart() {
        this.facade.clearCheckout()
    }
}
