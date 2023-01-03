import { CartItem } from "./models/cart";
import { createHtml } from "./helpers";
import { addSamplePack, Product } from "./models/product";
export const inventory = [] as Product[];
addSamplePack();
let cart: CartItem[] = []; // FÖRSTÖR KOD
// checkStorage() ? (cart = refreshCart() as CartItem[]) : (cart = []);

//#region TEST
if ((location.href = "index.html")) {
  testFunc();
}
function getItem(): Product {
  let id = sessionStorage.getItem("id");
  let it: Product = inventory.find((obj) => {
    return obj.id === id;
  }) as Product;
  return it;
}
let item: Product = getItem();
const img = createHtml("img", "prod__img") as HTMLImageElement;
img.setAttribute("src", item.imgLink); // get img by accessing object property
img.setAttribute("alt", "Product image");
const imgBox = document.querySelector(".prod__img-box") as HTMLDivElement;
imgBox.appendChild(img);
const itemInfo = document.querySelector(".prod__info") as HTMLDivElement;
const itemPrice = document.querySelector(".info__price") as HTMLSpanElement;
const itemLabel = document.querySelector(".info__lbl") as HTMLSpanElement;
itemPrice.innerHTML = item.price + " kr";
itemLabel.innerHTML = item.label + " || " + item.options;
itemInfo.appendChild(itemPrice);
itemInfo.appendChild(itemLabel);
const flavorSel = document.querySelector(
  ".prod__flav-sel"
) as HTMLSelectElement;
item.options.map((opt) => {
  let newOpt = createHtml("option", "item-opt");
  newOpt.innerHTML = opt;
  flavorSel.appendChild(newOpt);
});

function testFunc() {
  inventory.map((item: Product) => {
    console.log(item.id);
    testPrint(item);
  });
  function testPrint(item: Product) {
    let newDiv = createHtml("div", "testDiv"); // Create container
    newDiv.id = item.id; // Set container id to same as current Product.id
    let newImg = createHtml("img", "testImg"); // img
    newImg.setAttribute("alt", "product image"); // img alt text
    newImg.setAttribute("src", item.imgLink); // img alt text
    newDiv.appendChild(newImg); // append img to container
    let newTitle = createHtml("span", "testTitle"); // title text
    newTitle.innerHTML = item.label; // set title text to Product.label
    newDiv.appendChild(newTitle); // append title text to container
    document.body.appendChild(newDiv); // append container to body
    newDiv.addEventListener("click", () => {
      sessionStorage.setItem("id", item.id as string); // store id in sessionStorage
      console.log(sessionStorage.getItem("id"));
      location.href = "product.html"; // go to product page
      printHtml();
    });
  }
}

// Print product details on product page
function printHtml() {
  let item: Product = getItem();
  const img = createHtml("img", "prod__img") as HTMLImageElement;
  img.setAttribute("src", item.imgLink); // get img by accessing object property
  img.setAttribute("alt", "Product image");
  const imgBox = document.querySelector(".prod__img-box") as HTMLDivElement;
  imgBox.appendChild(img);
  const itemInfo = document.querySelector(".prod__info") as HTMLDivElement;
  const itemPrice = document.querySelector(".info__price") as HTMLSpanElement;
  const itemLabel = document.querySelector(".info__lbl") as HTMLSpanElement;
  itemPrice.innerHTML = item.price + " kr";
  itemLabel.innerHTML = item.label + " || " + item.options;
  itemInfo.appendChild(itemPrice);
  itemInfo.appendChild(itemLabel);
  const flavorSel = document.querySelector(
    ".prod__flav-sel"
  ) as HTMLSelectElement;
  item.options.map((opt) => {
    let newOpt = createHtml("option", "item-opt");
    newOpt.innerHTML = opt;
    flavorSel.appendChild(newOpt);
  });

  //#endregion

  //#region QUANTITY SELECTION
  quantityGetSet();
  //#endregion

  //#region Item description
  printDescription(item);

  generateSuggestions();
}

//#region ---> FUNCTIONS
function printDescription(item: Product) {
  const descriptionBox = document.querySelector(
    ".prod__description"
  ) as HTMLDivElement;
  descriptionBox.innerHTML = item.description;
}
/* Initializers */
function quantityGetSet(toCart: boolean = false): void | number {
  const qtyIncrement: HTMLButtonElement = document.querySelector(
    ".prod__qty-btn--incr"
  ) as HTMLButtonElement;
  const qtyDecrement: HTMLButtonElement = document.querySelector(
    ".prod__qty-btn--decr"
  ) as HTMLButtonElement;
  const qtyInput: HTMLInputElement = document.getElementById(
    "qty"
  ) as HTMLInputElement;
  if (toCart) {
    return parseInt(qtyInput.value);
  } else {
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
  }
}
/* Printers */
function printRandomObjects(
  promoSlots: HTMLSpanElement[],
  nums: number[],
  promoContainer: HTMLDivElement
) {
  for (let i = 0; i < promoSlots.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      let item: Product = inventory[j];
      let img = createHtml("img", "promo__prod-img");
      img.setAttribute("src", item.imgLink); // set img source
      promoSlots[i].appendChild(img);
      let txt = createHtml("span", "promo__prod-txt");
      txt.innerHTML = item.label;
      promoSlots[i].appendChild(txt);
      let link = createHtml("a", "promo__link");
      link.appendChild(promoSlots[i]);
      promoContainer.appendChild(link);
    }
  }
}
/* Generators */
function generateRandomInteger() {
  const nums: number[] = [];
  const goal: number = 4;
  while (nums.length !== goal) {
    let randomNumber: number = Math.floor(Math.random() * inventory.length + 1);
    let cleared: boolean = false;
    for (let i = 0; i < nums.length; i++) {
      if (randomNumber === nums[i]) {
        cleared = false;
        break;
      } else {
        cleared = true;
        continue;
      }
    }
    if (cleared) {
      nums.push(randomNumber);
    }
  }
  return nums;
}
function generateSuggestions() {
  const promoContainer = document.querySelector(".promo") as HTMLDivElement;
  const promo1 = createHtml("span", "promo__prod-1");
  const promo2 = createHtml("span", "promo__prod-2");
  const promo3 = createHtml("span", "promo__prod-3");
  const promo4 = createHtml("span", "promo__prod-4");
  const promoSlots = [] as HTMLSpanElement[];
  promoSlots.push(promo1, promo2, promo3, promo4);
  const nums: number[] = generateRandomInteger(); // Generate 4 random numbers without duplicates for product suggestions
  printRandomObjects(promoSlots, nums, promoContainer); // Print randomized suggestions
}
// Storage
function getObj(): Product {
  let id = sessionStorage.getItem("id" as string);
  console.log(id);
  let obj: Product = inventory[-1];
  for (let i = 0; i < inventory.length; i++) {
    if (inventory[i].id === id) {
      obj = inventory[i];
    }
  }
  return obj;
}

function handleToCartClick() {
  let url = window.location.search;
  url = url.replace("?", ""); // remove the ?
  alert(url); //alerts captured string
  let currentProduct = inventory.find((obj) => {
    return obj.id === url;
  });
  let qty = quantityGetSet(true) as number;
  cart.push(new CartItem(currentProduct as Product, qty));
  localStorage.setItem("cartContent", JSON.stringify(cart));
}

//#endregion
