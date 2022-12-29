import { Product } from "./product";

export class Cart {
  item: Product;
  qty: number;
  constructor(item: Product, qty: number) {
    this.item = item;
    this.qty = qty;
  }
}
