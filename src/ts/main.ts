
import {
  addSamplePack,
  pillOptions,
  powderOptions,
  Product,
  inventory,
} from "./models/product";
import { createHtml, createHtmlElementWithClassAndId } from "./helpers";
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

const product_container = createHtml("div", "product_box_start_page");
let counter = 0; //counter for each products to render

//iterate over each product
inventory.forEach((prodcut) => {
  let item_box_div = createHtmlElementWithClassAndId("div", "product_box", "product_box_" + counter);

  //load image from product object
  let img = new Image(120, 120);
  img.className = "img_item";
  img.setAttribute("src", prodcut.imgLink);
  img.setAttribute("alt", "Product image");
  item_box_div.appendChild(img);

  let product_info = createHtmlElementWithClassAndId("div", "product_info", "product_info_" + counter);

  //get price from product and append to paragraph tag
  let item_price = prodcut.price + " kr";
  let pg = createHtml("p", "txt_paragraph");
  let txt = document.createTextNode(item_price);
  pg.appendChild(txt);

  let add_to_cart = createHtmlElementWithClassAndId("button", "btn_add_to_cart", "btn_add_to_cart_" + counter); 
  add_to_cart.innerHTML = "Add to Cart";

  let prod_name = prodcut.label;
  let prod_link = createHtml("a", "a_prod_name");
  prod_link.setAttribute("href", "product.html/" + prodcut.id);
  //prod_link.setAttribute("target", "_blank");
  prod_link.innerHTML = prod_name;


  product_info.appendChild(prod_link);
  product_info.appendChild(pg);
  product_info.appendChild(add_to_cart);
  item_box_div.appendChild(product_info);

  if (counter === 6) {
    let slide_box = createHtml("div", "slide_box");
    product_container.appendChild(slide_box);
    let banner_box = createHtml("div", "banner");
    product_container.appendChild(banner_box);

  }

  product_container.appendChild(item_box_div);
  counter += 1;
});

const footer = document.getElementById("footer");
if (footer !== null) {
  product_container.appendChild(footer);
}

document.body.appendChild(product_container);

let btn_list = document.getElementsByClassName(
  "btn_add_to_cart"
) as HTMLCollectionOf<HTMLElement>;

for (let i = 0; i < btn_list.length; i++) {
  btn_list[i].addEventListener("click", () => {
    let info = document.getElementById("product_info_" + i) as HTMLElement;

    let to_be_removed = document.getElementById("btn_add_to_cart_" + i) as HTMLElement;
    to_be_removed.parentNode?.removeChild(to_be_removed);

    let btnContainer = createCartButtons(i);
    info.appendChild(btnContainer);
    minusFromCurrentValue(i);
    addToCurrentValue(i);
  });
}

//add to Cart buttons
function createCartButtons(id_number: number): HTMLElement {
  let btnContainer = createHtmlElementWithClassAndId("div", "button_container", "btn_container_" + id_number);
  let btnMinus = createHtmlElementWithClassAndId("button", "btn_minus", "btn_minus_" + id_number);
  btnMinus.innerHTML = "-";
  btnContainer.appendChild(btnMinus);

  let txtField = createHtmlElementWithClassAndId("input", "input_number", "input_number_"+id_number);
  txtField.setAttribute("type", "number");
  txtField.setAttribute("value", "1"); //initial value
  btnContainer.appendChild(txtField);

  let btnAdd = createHtmlElementWithClassAndId("button", "btn_plus", "btn_plus_"+id_number);
  btnAdd.innerHTML = "+";
  btnContainer.appendChild(btnAdd);

  return btnContainer;
}

//minus current value \
function minusFromCurrentValue(currentElement: number) {
  let minus = document.getElementById("btn_minus_" + currentElement);
  if (minus !== null)
    minus.addEventListener("click", () => {
      let btn_minus = document.getElementById("input_number_"+currentElement) as HTMLInputElement;
      let current_value:number = Number(btn_minus.value) - 1;
      btn_minus.value = current_value.toString();

      if (current_value == 0) {
        let minus = document.getElementById("btn_container_" + currentElement) as HTMLElement;
        minus.parentNode?.removeChild(minus);
        let add_to_cart = createHtmlElementWithClassAndId("button", "btn_add_to_cart", "btn_add_to_cart_" + currentElement);
        add_to_cart.innerHTML = "Add to Cart";
        console.log(add_to_cart);
        let product_info = document.getElementById("product_info_" + currentElement);
        product_info?.appendChild(add_to_cart);

      }   
    });
}

//add to current value
function addToCurrentValue(currentElement: number): void {
  let plus = document.getElementById("btn_plus_" + currentElement);
  if (plus !== null)
    plus.addEventListener("click", function (event) {
      let btn_plus = document.getElementById(
        "input_number_"+currentElement
      ) as HTMLInputElement;
      let current_value: number = Number(btn_plus.value) + 1;
      btn_plus.value = current_value.toString();
    });
}
 