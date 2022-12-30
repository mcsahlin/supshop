import {
  addSamplePack,
  pillOptions,
  powderOptions,
  Product,
  inventory,
} from "./models/product";
import { createHtml } from "./helpers";
//#region Initialize PRODUCT PAGE
addSamplePack();
const btnBack = document.getElementById("btn-back") as HTMLButtonElement;
btnBack.addEventListener("click", history.back);
const imgBox = document.querySelector(".prod__img-box") as HTMLDivElement;

//Get the url from document
let baseUrl = document.URL;

//Extract product id from the url
let productId = baseUrl.substring(baseUrl.lastIndexOf("/")+1, baseUrl.length);

function getCurrentProductById(productId:string):Product|null {
  for (let i = 0; i < inventory.length; i++) {
    if (inventory[i].id === productId) {
      return inventory[i];
    }
  }
  return null;
}
let product = getCurrentProductById(productId);
// LOAD ID.img if product is available with the extracted id from the url.
if(product !== null){
  const img = createHtml("img", "prod__img") as HTMLImageElement;
  img.setAttribute("src", product.imgLink);
  img.setAttribute("alt", "Product image");
  imgBox.appendChild(img);
  //#endregion
  //#region Price and label
  const itemInfo = document.querySelector(".prod__info") as HTMLDivElement;
  const itemPrice = document.querySelector(".info__price") as HTMLSpanElement;
  const itemLabel = document.querySelector(".info__lbl") as HTMLSpanElement;
  itemPrice.innerHTML = product.price + " kr";
  itemLabel.innerHTML = product.label + " || " + product.options;
  itemInfo.appendChild(itemPrice);
  itemInfo.appendChild(itemLabel);
  //#endregion
//#region Item options
const flavorSel = document.querySelector(
  ".prod__flav-sel"
) as HTMLSelectElement;
if (product.isPills) {
  pillOptions.map((opt) => {
    let newOpt = createHtml("option", "pill-opt");
    newOpt.innerHTML = opt;
    flavorSel.appendChild(newOpt);
  });
} else {
  powderOptions.map((opt) => {
    let newOpt = createHtml("option", "pill-opt") as HTMLOptionElement;
    newOpt.innerHTML = opt;
    flavorSel.appendChild(newOpt);
  });
}
//#endregion
//#region QUANTITY SELECTION
const qtyIncrement: HTMLButtonElement = document.querySelector(
  ".prod__qty-btn--incr"
) as HTMLButtonElement;
const qtyDecrement: HTMLButtonElement = document.querySelector(
  ".prod__qty-btn--decr"
) as HTMLButtonElement;
const qtyInput: HTMLInputElement = document.getElementById(
  "qty"
) as HTMLInputElement;
qtyIncrement.addEventListener("click", () => {
  let qty: number = parseInt(qtyInput.value);
  qty < 20 ? qty++ : console.log("error");
  qtyInput.value = qty.toString();
});
qtyDecrement.addEventListener("click", () => {
  let qty: number = parseInt(qtyInput.value);
  qty > 1 ? qty-- : console.log("error");
  qtyInput.value = qty.toString();
});
qtyInput.addEventListener("blur", () => {
  let qty: number = parseInt(qtyInput.value);
  qty > 20 ? (qty = 20) : qty < 1 ? (qty = 1) : (qty = qty);
  qtyInput.value = qty.toString();
});
//#endregion

//#region Item description
const descriptionBox = document.querySelector(
  ".prod__description"
) as HTMLDivElement;
descriptionBox.innerHTML = product.description;
//#endregion
//#region Product suggestions
const promo1 = document.querySelector(".promo__prod-1") as HTMLSpanElement;
const promo2 = document.querySelector(".promo__prod-2") as HTMLSpanElement;
const promo3 = document.querySelector(".promo__prod-3") as HTMLSpanElement;
const promo4 = document.querySelector(".promo__prod-4") as HTMLSpanElement;
let promoSlots = [] as HTMLSpanElement[];
promoSlots.push(promo1, promo2, promo3, promo4);
for (let i = 0; i < promoSlots.length; i++) {
  let img = createHtml("img", "promo__prod-img");
  img.setAttribute("src", inventory[i].imgLink);
  let txt = createHtml("span", "promo__prod-txt");
  txt.innerHTML = inventory[i].label;
  promoSlots[i].appendChild(img);
  promoSlots[i].appendChild(txt);
}
}


//#endregion