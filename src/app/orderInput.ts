import { Address } from './address';

export class OrderInput{
    productAddress: Address;
    productInputList: Array<{id: number, quantity: number }> = []
}