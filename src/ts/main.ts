import {
  addSamplePack,
  pillOptions,
  powderOptions,
  Product,
} from "./models/product";
import {
  createHtml,
  createHtmlElementWithClassAndId,
  getCurrentProductById,
} from "./helpers";
import { Cart } from "./models/cart";
import { generateSuggestions } from "./services/promos";
export const inventory: Product[] = addSamplePack();
const cartValue: Cart[] = [];
let Page = {
  home: "home",
  details: "product",
  cart: "cart",
  checkout: "checkout",
  confirmation: "confirmation",
};
const main = document.getElementById("main") as HTMLElement;
function init() {
  main.classList.remove(
    "page--home page--product page--cart page--checkout page--confirmation"
  );
}
let page = Page.home;
load(null, page);
function load(e: Event | null, page: string, id: string = "") {
  if (e) {
    e.preventDefault();
  }
  init();
  main.classList.add(`page--${page}`);
  printPage();
}
function printPage() {
  switch (page) {
    case Page.home:
      // StartPage start________________________Y
      const product_container = createHtml("div", "product_box_start_page");
      //counter for each products to render
      let counter = 0;
      //iterate over each product
      inventory.forEach((product) => populateStaticData(product));
      function populateStaticData(product: Product) {
        let item_box_div = createHtmlElementWithClassAndId(
          "div",
          "product_box",
          "product_box_" + counter
        );
        //#region PREP for turning whole div to link
        // item_box_div.addEventListener("click", () =>
        //   localStorage.setItem("product_id", item_box_div.id)
        // );
        //#endregion
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
          prod_link.addEventListener("click", (e) => {
            sessionStorage.setItem("product_id", product.id);

            goTo(Page.details);
          });
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
            let info = document.getElementById(
              "product_info_" + i
            ) as HTMLElement;
            let to_be_removed = document.getElementById(
              "btn_add_to_cart_" + i
            ) as HTMLElement;
            to_be_removed.parentNode?.removeChild(to_be_removed);
            let btnContainer = createCartButtons(i);
            info.appendChild(btnContainer);
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
            let product_in_cart = new Cart(
              inventory[currentElement],
              current_value
            );
            addToCartBox(product_in_cart);
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
            let product_in_cart = new Cart(
              inventory[currentElement],
              current_value
            );
            addToCartBox(product_in_cart);
            btn_plus.value = current_value.toString();
          });
      }
      function addToCartBox(product_in_cart: Cart) {
        //let shopping_cart = document.getElementById("shopping_cart");
        let product_ids_in_cart = cartValue.map((ca) => ca.item.id);
        let current_cart = product_in_cart;
        if (cartValue.length === 0) {
          cartValue.push(product_in_cart);
          console.log(
            "Adding for the first and Selected product id: " +
              product_in_cart.item.id
          );
          console.log(product_in_cart.qty);
          // let shopping_cart = document.getElementById("shopping_cart") as HTMLElement;
          // shopping_cart.innerHTML = "product id: "+product_in_cart.item.imgLink+"And quantity: "+product_in_cart.qty;
        } else if (
          cartValue !== null &&
          !product_ids_in_cart.includes(product_in_cart.item.id)
        ) {
          cartValue.push(product_in_cart);
          cartValue.forEach((cart) => {
            current_cart = cart;
            // let shopping_cart = document.getElementById("shopping_cart") as HTMLElement;
            // shopping_cart.innerHTML = "product id: "+cart.item.id+"And quantity: "+cart.qty;
            console.log("Selected product id: " + cart.item.id);
            console.log(cart.qty);
          });
        } else {
          console.log("updating quantity ");
          //current_cart.qty
          console.log(current_cart.qty);
          // let shopping_cart = document.getElementById("shopping_cart") as HTMLElement;
          //shopping_cart.innerHTML = "product id: "+current_cart.item.id+"And quantity: "+current_cart.qty;
        }
        let prices: number = 0;
        cartValue.forEach((p) => {
          prices += Number(p.item.price) * p.qty;
        });
        console.log(
          "Totat products in cart: " +
            cartValue.length +
            " total price: " +
            prices
        );
      }
      break;
    case Page.details:
      const btnBack = document.getElementById("btn-back") as HTMLButtonElement;
      btnBack.addEventListener("click", window.history.back);
      let productId = sessionStorage.getItem("product_id");
      if (productId) {
        let product: Product;
        let found = getCurrentProductById(productId, inventory);
        if (found) {
          product = found;
          const imgBox = document.querySelector(
            ".prod__img-box"
          ) as HTMLDivElement;
          const img = createHtml("img", "prod__img") as HTMLImageElement;
          img.setAttribute("src", product.imgLink);
          img.setAttribute("alt", "Product image");
          imgBox.appendChild(img);
          //#region Price and label
          const itemInfo = document.querySelector(
            ".prod__info"
          ) as HTMLDivElement;
          const itemPrice = document.querySelector(
            ".info__price"
          ) as HTMLSpanElement;
          const itemLabel = document.querySelector(
            ".info__lbl"
          ) as HTMLSpanElement;
          itemPrice.innerHTML = product.price + " kr";
          itemLabel.innerHTML = product.label + " || " + inventory[0].options;
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
              let newOpt = createHtml(
                "option",
                "pill-opt"
              ) as HTMLOptionElement;
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
        }
      } // END if found
      generateSuggestions();
      //#endregion
      //#region Product suggestions (OLD)
      // const promo1 = document.querySelector(
      //   ".promo__prod-1"
      // ) as HTMLSpanElement;
      // const promo2 = document.querySelector(
      //   ".promo__prod-2"
      // ) as HTMLSpanElement;
      // const promo3 = document.querySelector(
      //   ".promo__prod-3"
      // ) as HTMLSpanElement;
      // const promo4 = document.querySelector(
      //   ".promo__prod-4"
      // ) as HTMLSpanElement;
      // let promoSlots = [] as HTMLSpanElement[];
      // promoSlots.push(promo1, promo2, promo3, promo4);
      // for (let i = 0; i < promoSlots.length; i++) {
      //   let img = createHtml("img", "promo__prod-img");
      //   img.setAttribute("src", inventory[i].imgLink);
      //   let txt = createHtml("span", "promo__prod-txt");
      //   txt.innerHTML = inventory[i].label;
      //   promoSlots[i].appendChild(img);
      //   promoSlots[i].appendChild(txt);
      // }
      //#endregion
      break;

    default:
      break;
  }
}

function goTo(targetPage: string) {
  page = targetPage;
  load(null, page);
}
//#region START

//#endregion

//#endregion
