import { addSamplePack, Product } from "./models/product";
import { createHtml, createHtmlElementWithClassAndId } from "./helpers";
import { Cart } from "./models/cart";
const inventory: Product[] = addSamplePack();
let cartValue: Cart[] = [];

// StartPage start________________________Y

const product_container = createHtml("div", "product_box_start_page");
//counter for each products to render

let counter = 0;
//iterate over each product
inventory.forEach((prodcut) => populateStaticData(prodcut));

displayToCartBox("Total: 00.00", "Products: 0");

function populateStaticData(product: Product) {
  let item_box_div = createHtmlElementWithClassAndId(
    "div",
    "product_box",
    "product_box_" + counter
  );
  //load image from product object
  let img = new Image(120, 120);
  img.className = "img_item";
  img.setAttribute("src", product.imgLink);
  img.setAttribute("alt", "Product image");
  item_box_div.appendChild(img);

  let product_info = createHtmlElementWithClassAndId(
    "div",
    "product_info",
    "product_info_" + counter
  );

  //get price from product and append to paragraph tag
  let item_price = product.price + " kr";
  let pg = createHtml("p", "txt_paragraph");
  let txt = document.createTextNode(item_price);
  pg.appendChild(txt);

  let add_to_cart = createHtmlElementWithClassAndId(
    "button",
    "btn_add_to_cart",
    "btn_add_to_cart_" + counter
  );
  add_to_cart.innerHTML = "Add to Cart";
  let prod_name = product.label;
  let prod_link = createHtml("a", "a_prod_name");
  prod_link.innerHTML = prod_name;
  if (prod_link !== null) {
    prod_link.addEventListener(
      "click",
      () => localStorage.setItem("product_id", product.id),
      false
    );
    prod_link.setAttribute("href", "http://localhost:1234/product.html");
  }

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
}

const footer = document.getElementById("footer");
if (footer !== null) {
  product_container.appendChild(footer);
}

document.body.appendChild(product_container);

function addToCart() {
  let btn_list = document.getElementsByClassName(
    "btn_add_to_cart"
  ) as HTMLCollectionOf<HTMLElement>;

  for (let i = 0; i < btn_list.length; i++) {
    btn_list[i].addEventListener("click", () => {
      let info = document.getElementById("product_info_" + i) as HTMLElement;

      let to_be_removed = document.getElementById(
        "btn_add_to_cart_" + i
      ) as HTMLElement;
      to_be_removed.parentNode?.removeChild(to_be_removed);
      let btnContainer = createCartButtons(i);
      info.appendChild(btnContainer);
      let product_in_cart = new Cart(inventory[i], 1);
      addToCartBox(product_in_cart);
      minusFromCurrentValue(i);
      addToCurrentValue(i);
    });
  }
}

addToCart();
//add to Cart buttons
function createCartButtons(id_number: number): HTMLElement {
  let btnContainer = createHtmlElementWithClassAndId(
    "div",
    "button_container",
    "btn_container_" + id_number
  );
  let btnMinus = createHtmlElementWithClassAndId(
    "button",
    "btn_minus",
    "btn_minus_" + id_number
  );
  btnMinus.innerHTML = "-";
  btnContainer.appendChild(btnMinus);

  let txtField = createHtmlElementWithClassAndId(
    "input",
    "input_number",
    "input_number_" + id_number
  );
  txtField.setAttribute("type", "number");
  txtField.setAttribute("value", "1"); //initial value
  btnContainer.appendChild(txtField);

  let btnAdd = createHtmlElementWithClassAndId(
    "button",
    "btn_plus",
    "btn_plus_" + id_number
  );
  btnAdd.innerHTML = "+";
  btnContainer.appendChild(btnAdd);

  return btnContainer;
}

//minus current value \
function minusFromCurrentValue(currentElement: number) {
  let minus = document.getElementById("btn_minus_" + currentElement);
  if (minus !== null)
    minus.addEventListener("click", () => {
      let txt_input = document.getElementById(
        "input_number_" + currentElement
      ) as HTMLInputElement;
      let current_value: number = Number(txt_input.value) - 1;
      txt_input.value = current_value.toString();
      let product_in_cart = new Cart(inventory[currentElement], current_value);
      for (let i = 0; i < cartValue.length; i++) {
        if (cartValue[i].item.id === product_in_cart.item.id) {
          if (cartValue[i].qty > 0) {
            cartValue[i].qty -= 1;
          } else {
            cartValue = cartValue.filter((cart) => cart !== cartValue[i]);
          }
          let prices: number = 0;
          let quantityCounter = 0;

          cartValue.forEach((p) => {
            prices += Number(p.item.price) * p.qty;
            quantityCounter += p.qty;
          });

          updateCurrentPriceAndQuantity(
            prices.toString(),
            quantityCounter.toString()
          );
        }
      }
      if (current_value == 0) {
        let to_remove = document.getElementById(
          "btn_container_" + currentElement
        ) as HTMLElement;
        to_remove.parentNode?.removeChild(to_remove);
        let add_to_cart = createHtmlElementWithClassAndId(
          "button",
          "btn_add_to_cart",
          "btn_add_to_cart_" + currentElement
        );
        add_to_cart.innerHTML = "Add to Cart";
        let product_info = document.getElementById(
          "product_info_" + currentElement
        );
        product_info?.appendChild(add_to_cart);

        addToCart();
      }
    });
}

//add to current value
function addToCurrentValue(currentElement: number): void {
  let plus = document.getElementById("btn_plus_" + currentElement);
  if (plus !== null)
    plus.addEventListener("click", () => {
      let btn_plus = document.getElementById(
        "input_number_" + currentElement
      ) as HTMLInputElement;
      let current_value: number = Number(btn_plus.value) + 1;
      let product_in_cart = new Cart(inventory[currentElement], current_value);
      addToCartBox(product_in_cart);
      btn_plus.value = current_value.toString();
    });
}

function addToCartBox(product_in_cart: Cart) {
  let product_ids_in_cart = cartValue.map((ca) => ca.item.id);
  if (cartValue.length === 0) {
    cartValue.push(product_in_cart);
  } else if (
    cartValue !== null &&
    !product_ids_in_cart.includes(product_in_cart.item.id)
  ) {
    cartValue.push(product_in_cart);
  } else {
    cartValue.forEach((p) => {
      if (p.item.id === product_in_cart.item.id) {
        p.qty += 1;
      }
    });
  }

  let prices: number = 0;
  let quantityCounter = 0;

  cartValue.forEach((p) => {
    prices += Number(p.item.price) * p.qty;
    quantityCounter += p.qty;
  });

  updateCurrentPriceAndQuantity(prices.toString(), quantityCounter.toString());
}

function displayToCartBox(caculatedPrice: string, counterText: string) {
  const cartIcon = document.getElementById("cart_ic") as HTMLElement;
  const counter = createHtml("span", "counter_txt") as HTMLElement;
  counter.textContent = counterText;
  const totalPrice = createHtml("span", "total_pr");
  totalPrice.textContent = caculatedPrice + " kr";
  const linkToStore = createHtmlElementWithClassAndId(
    "a",
    "cart_box_link",
    "cart_box_link_id"
  );
  linkToStore.appendChild(cartIcon);

  linkToStore.appendChild(totalPrice);
  linkToStore.addEventListener("click", () => {
    if (cartValue.length <= 0) {
      alert("Cart is empty! Add some products");
      return;
    }

    localStorage.setItem("cartValues", JSON.stringify(cartValue));
    linkToStore.setAttribute("href", "../cart.html");
  });

  const cartContainer = document.getElementById("shopping_cart") as HTMLElement;
  cartContainer.appendChild(counter);
  cartContainer.appendChild(linkToStore);
}

function updateCurrentPriceAndQuantity(price: string, quantity: string) {
  let priceSpan = document.querySelector(".total_pr") as HTMLElement;
  let counter = document.querySelector(".counter_txt") as HTMLElement;
  priceSpan.textContent = "Total: " + price + " kr";
  counter.textContent = "Products: " + quantity;
}
