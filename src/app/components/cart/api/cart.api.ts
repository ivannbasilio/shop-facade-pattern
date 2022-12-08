import { Injectable } from '@angular/core';
import { Checkout } from '../../../models/Checkout';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../../../constants';

@Injectable({ providedIn: 'root' })
export class CartApi {

    constructor(private http: HttpClient) { }

    checkout(checkout: Checkout): Observable<any> {
        return this.http.post(Constants.URL_BASE + '/checkout', checkout);
    }
}
