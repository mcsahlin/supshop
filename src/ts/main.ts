import { addSamplePack, Product } from "./modules/product";
import { createHtml } from "./_functions";
//#region PRODUCT PAGE

addSamplePack();
const btnBack = document.getElementById("btn-back") as HTMLButtonElement;
btnBack.addEventListener("click", history.back);
// const imgBox = document.querySelector("prod__img-box") as HTMLDivElement;
const imgBox: HTMLDivElement = document.getElementById(
  "prod__img-box"
) as HTMLDivElement;

// LOAD ID.img
const img = createHtml("img", "prod__img") as HTMLImageElement;
img.setAttribute("src", ".././assets/ApigeninCapsulesSPLASHv2__48047.jpg");
img.setAttribute("alt", "Product image");
imgBox.appendChild(img);

//#endregion PRODUCT PAGE

// Create item image container

// Item price and label
const itemInfo = createHtml("div", "details__info-box");
const itemPrice = createHtml("h2", "details__item-price");
const itemName = createHtml("p", "details__item-name");

// Item options
const buyBox = createHtml("div", "details__buy-box");
const itemOptions = createHtml("select", "details__options");
const itemOptionsLabel = createHtml("label", "details__options-label");
const incrQuantityBtn = createHtml("button", "details__increase-btn");
const decrQuantityBtn = createHtml("button", "details__decrease-btn");
const quantityNumbox = createHtml("input", "details__quantity");
const toCartBtn = createHtml("button", "details__to-cart-btn");

// Item description
const descriptionBox = createHtml("article", "details__description");

// Product suggestions
const otherProducts = createHtml("section", "details__other-products");
