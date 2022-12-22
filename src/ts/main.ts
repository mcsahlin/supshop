import {
  addSamplePack,
  pillOptions,
  powderOptions,
  Product,
} from "./modules/product";
import { createHtml } from "./_functions";

//#region PRODUCT PAGE

const inventory: Product[] = addSamplePack();
const btnBack = document.getElementById("btn-back") as HTMLButtonElement;
btnBack.addEventListener("click", history.back);
const imgBox = document.querySelector(".prod__img-container") as HTMLDivElement;

// LOAD ID.img
const img = createHtml("img", "prod__img") as HTMLImageElement;
img.setAttribute(
  "src",
  "https://www.tillskottsbolaget.se/bilder/artiklar/zoom/SUPPNEEDS4321_1.jpg?m=1626461883"
);
img.setAttribute("alt", "Product image");
imgBox.appendChild(img);

//#endregion PRODUCT PAGE

// Create item image container

// Item price and label
const itemInfo = document.querySelector(".prod__info") as HTMLDivElement;
const itemPrice = document.querySelector(".info__price") as HTMLSpanElement;
const itemLabel = document.querySelector(".info__lbl") as HTMLSpanElement;
itemPrice.innerHTML = inventory[0].price + " kr";
itemLabel.innerHTML = inventory[0].label + " || " + inventory[0].options;
itemInfo.appendChild(itemPrice);
itemInfo.appendChild(itemLabel);

// Item options
const flavorSel = document.querySelector(
  ".prod__flav-sel"
) as HTMLSelectElement;
if (inventory[0].isPills) {
  pillOptions.map((opt) => {
    let newOpt = createHtml("option", "pill-opt") as HTMLOptionElement;
    newOpt.innerHTML = opt;
    flavorSel.innerHTML += newOpt;
  });
} else {
  powderOptions.map((opt) => {
    let newOpt = createHtml("option", "pill-opt") as HTMLOptionElement;
    newOpt.innerHTML = opt;
    flavorSel.innerHTML += newOpt;
  });
}

// Item description
const descriptionBox = document.querySelector(
  ".prod__description"
) as HTMLDivElement;
descriptionBox.innerHTML = inventory[0].description;

// Product suggestions
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
