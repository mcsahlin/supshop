//#region Add To Cart

import { Cart } from "./cart";
import { inventory } from "./product";

const cart: Cart[] = [];
// Initialize buy btn
const toCartBtn: HTMLButtonElement = document.getElementById(
  "prod-to-cart"
) as HTMLButtonElement;

toCartBtn.addEventListener("click", handleToCart);

export function handleToCart(): void {
  let id: string = localStorage.getItem("id") as string;
  const qtyInput = document.getElementById("qty") as HTMLInputElement;
  let qty: number = parseInt(qtyInput.value);
  toCart(id, qty);
}
function toCart(id: string, qty: number): void {
  for (let i = 0; i < inventory.length; i++) {
    if (inventory[i].id == id) {
      cart.push(new Cart(inventory[i], qty));
      break;
    }
  }
  // inventory
  //   .filter((product) => product.id == id)
  //   .forEach((product) => cart.push(new Cart(product, qty)));
}

//#endregion
