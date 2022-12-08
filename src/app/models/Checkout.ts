import { Account } from './Account';
import { Product } from './Product';

export interface Checkout {
    id: string,
    uid: string,
    products: Product[],
    created: Date
}