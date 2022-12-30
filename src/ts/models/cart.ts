import { Product } from "./product";
export class CartItem {
  item: Product;
  quantity: number;
  constructor(item: Product, quantity: number) {
    this.item = item;
    this.quantity = quantity;
  }
}
