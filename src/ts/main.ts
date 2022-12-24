import {
  addSamplePack,
  pillOptions,
  powderOptions,
  Product,
  inventory,
} from "./models/product";
import { createHtml } from "./helpers";
const body = document.body;
const mainDiv = createHtml("main", "main") as HTMLDivElement;
body.appendChild(mainDiv);

//#region Initialize PRODUCT PAGE
addSamplePack();
const btnBack = document.getElementById("btn-back") as HTMLButtonElement;
btnBack.addEventListener("click", history.back);
const imgBox = document.querySelector(".prod__img-box") as HTMLDivElement;

// LOAD ID.img
const img = createHtml("img", "prod__img") as HTMLImageElement;
img.setAttribute("src", inventory[0].imgLink);
img.setAttribute("alt", "Product image");
imgBox.appendChild(img);
//#endregion
//#region Price and label
const itemInfo = document.querySelector(".prod__info") as HTMLDivElement;
const itemPrice = document.querySelector(".info__price") as HTMLSpanElement;
const itemLabel = document.querySelector(".info__lbl") as HTMLSpanElement;
itemPrice.innerHTML = inventory[0].price + " kr";
itemLabel.innerHTML = inventory[0].label + " || " + inventory[0].options;
itemInfo.appendChild(itemPrice);
itemInfo.appendChild(itemLabel);
//#endregion
//#region Item options
const flavorSel = document.querySelector(
  ".prod__flav-sel"
) as HTMLSelectElement;
if (inventory[0].isPills) {
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
descriptionBox.innerHTML = inventory[0].description;
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
//#endregion
const menuBtn = document.querySelector(".topnav__menu-btn") as HTMLDivElement;
let menuActive: boolean = false;
menuBtn.addEventListener("click", () => {
  if (!menuActive) {
    menuBtn.classList.add("topnav__menu-btn--active");
    menuActive = true;
  } else {
    menuBtn.classList.remove("topnav__menu-btn--active");
    menuActive = false;
  }
});


// StartPage start________________________Yo

const product_container = createHtml( "div","product_box_start_page");
const product_box = createHtml("div", "product_box");
const product_box2 = createHtml("div", "product_box2");
const product_box3 = createHtml("div", "product_box3");
const product_box4 = createHtml("div", "product_box4");

product_container.appendChild(product_box);
product_container.appendChild(product_box2);
product_container.appendChild(product_box3);
product_container.appendChild(product_box4);

document.body.appendChild(product_container);

const banner_box = createHtml( "div","banner");
document.body.appendChild(banner_box);

const slide_div = createHtml("div", "slide_div");

const ban_slide = document.createElement('img');
ban_slide.src= "https://www.tillskottsbolaget.se/bilder/artiklar/zoom/SPORTLAB753_1.jpg?m=1654808842";

slide_div.appendChild(ban_slide);

document.body.appendChild(slide_div);



