import { cart } from '../main';
import { Product } from './product';

export class CartItem {
  item: Product;
  quantity: number;
  constructor(item: Product, quantity: number) {
    this.item = item;
    this.quantity = quantity;
  }
}
function setCartData(toCart: object) {
  localStorage.setItem('cart', JSON.stringify(toCart));
  return false;
}
function getCartData(): string {
  return JSON.parse(localStorage.getItem('cart') || '');
}
function calculateCartData(item: object): number {
  let count: number = 0;
  for (let i in item) {
    count++;
  }
  return count;
}
export function calc(sumTotal: boolean = false): number {
  if (sumTotal) {
    let sum: number = 0;
    cart.forEach((p) => {
      sum += p.item.price * p.quantity;
    });
    return sum;
  } else {
    cart.forEach((p) => {
      return p.item.price * p.quantity;
    });
  }
  return NaN;
}
function addToCart(product: Product, quantity: number) {
  let toCart = new CartItem(product, quantity);
  cart.push(toCart);
}
