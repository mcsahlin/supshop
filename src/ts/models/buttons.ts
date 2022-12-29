//#region Add To Cart

import { Product, inventory } from "./product";

const cart: Product[] = [];
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
  let item: Product = inventory.map((item) => {
    if (id === item.id) {
      return item as Product;
    } else {
      console.log("Error");
    }
  });
  for (let i = 0; i < qty; i++) {
    cart.push(item);
  }
}

//#endregion
