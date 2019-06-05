import { Address } from './address';
import { ProductInput } from './productInput';

export class OrderInput {
    address: Address;
    productInputList: ProductInput[];

    constructor(address: Address, productInputList: ProductInput[]) {
        this.address = address;
        this.productInputList = productInputList;
    }
}