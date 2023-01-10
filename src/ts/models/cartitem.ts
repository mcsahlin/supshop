import { cart } from '../main';
import { Product } from './product';

export class CartItem extends Product {
  quantity: number = NaN;
  totalPrice: number = NaN;
  constructor(p: Product, quantity: number) {
    super(
      p.id,
      p.label,
      p.price,
      p.options,
      p.description,
      p.imgLink,
      p.isPills
    );
    this.quantity = quantity;
    this.totalPrice = p.price * quantity;
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
