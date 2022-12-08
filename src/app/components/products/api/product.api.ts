import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../models/Product';
import { Constants } from '../../../../constants';

@Injectable({ providedIn: 'root' })
export class ProductApi {

    constructor(private http: HttpClient) { }

    getAllProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(Constants.URL_BASE + '/products');
    }

    searchProducts(query: string): Observable<Product[]> {
        return this.http.get<Product[]>(Constants.URL_BASE + `/search?query=${query}`);
    }
}
