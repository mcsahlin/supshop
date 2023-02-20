import { Cart } from "./models/cart";
import { Product } from "./models/product";
import { createHtml, createHtmlElementWithClassAndId } from "./helpers";

let cartValues: Cart[] = [];

function readFromLocalStorage(filename: string) {
  let values = localStorage.getItem(filename);
  cartValues = JSON.parse(values !== null ? values : "") as Cart[];
  cartValues.forEach((cartItem) => {
    populateCartData(cartItem);
  });
}

let totalCalculatedPrice = 0;
const product_container = createHtml("div", "cartContent") as HTMLElement;

function populateCartData(cartItem: Cart) {
  if (cartItem.qty == 0) {
    return;
  }

  let img = new Image(120, 120);
  img.className = "cartImg";
  img.setAttribute("src", cartItem.item.imgLink);
  img.setAttribute("alt", "Product image");
  let cartProductBox = createHtml("div", "cartBox") as HTMLElement;
  let cartProductInfo = createHtml("div", "CartProductInfo") as HTMLElement;
  let cartProductName = createHtml("div", "CartProductName") as HTMLElement;
  let cartNameInfo = createHtml("div", "cartNameInfo") as HTMLBRElement;
  let cartProductPrice = createHtmlElementWithClassAndId(
    "div",
    "CartProductPrice",
    cartItem.item.id
  ) as HTMLElement;
  let cartProductQuantity = createHtml(
    "input",
    "CartProductQuantity"
  ) as HTMLElement;
  let item_price = Number(cartItem.item.price) * cartItem.qty + " kr";
  cartProductQuantity.setAttribute("value", cartItem.qty.toString());
  cartProductQuantity.setAttribute("readOnly", "true");
  let textFormat = document.createTextNode(cartItem.item.label);
  cartProductName.appendChild(textFormat);

  let priceInText = document.createTextNode(item_price);

  cartProductBox.appendChild(img);

  let cartButtonInfo = createHtml("div", "infoButtonBox");

  let addButton = createHtml("button", "btn_plus");
  let addButtonText = document.createTextNode("+");
  addButton.appendChild(addButtonText);

  let buttonBox = createHtml("div", "btnBox");

  let minusButton = createHtml("button", "btn_minus");
  let minusButtonText = document.createTextNode("-");
  minusButton.appendChild(minusButtonText);

  cartProductBox.appendChild(cartButtonInfo);
  cartNameInfo.appendChild(cartProductName);
  cartNameInfo.appendChild(buttonBox);

  cartButtonInfo.appendChild(cartNameInfo);
  cartButtonInfo.appendChild(cartProductInfo);
  cartProductBox.appendChild(cartButtonInfo);
  buttonBox.appendChild(minusButton);
  buttonBox.appendChild(cartProductQuantity);
  buttonBox.appendChild(addButton);

  totalCalculatedPrice += Number(cartItem.item.price) * cartItem.qty;

  minusButton.addEventListener("click", (e) => {
    let btnMinus = e.target as HTMLElement;
    let btnBox = btnMinus.parentNode as HTMLElement;
    let txtValue = btnBox.querySelector(
      ".CartProductQuantity"
    ) as HTMLInputElement;
    let currentQty = handleDecrement(cartItem.item, Number(txtValue.value));
    let cartNInfo = btnBox.parentNode as HTMLElement;
    let infoBtnBox = cartNInfo.parentNode as HTMLElement;
    let rootNode = infoBtnBox.parentNode as HTMLElement;
    if (currentQty <= 0) {
      rootNode.remove();
    }
    cartProductQuantity.setAttribute("value", currentQty.toString());
    let currentPrice = Number(cartItem.item.price) * currentQty;
    updatePrice(cartItem.item.id, currentPrice);
    totalCalculatedPrice -= Number(cartItem.item.price);
    updateTotalPrice();
  });

  addButton.addEventListener("click", (e) => {
    let btnPlus = e.target as HTMLElement;
    let btnBox = btnPlus.parentNode as HTMLElement;
    let txtValue = btnBox.querySelector(
      ".CartProductQuantity"
    ) as HTMLInputElement;
    let currentQty = handleIncrement(Number(txtValue.value));
    cartProductQuantity.setAttribute("value", currentQty.toString());
    let currentPrice = Number(cartItem.item.price) * currentQty;
    updatePrice(cartItem.item.id, currentPrice);
    totalCalculatedPrice += Number(cartItem.item.price);
    updateTotalPrice();
  });

  const deleteIcon = new Image(40, 90);
  deleteIcon.src = "https://cdn-icons-png.flaticon.com/512/3405/3405244.png";
  document.body.appendChild(deleteIcon);
  deleteIcon.classList.add("removeButton");
  handleDelete(deleteIcon, cartItem.item, cartItem.qty);
  cartButtonInfo.appendChild(deleteIcon);
  product_container.appendChild(cartProductBox);

  cartProductPrice.appendChild(priceInText);
  cartProductInfo.appendChild(cartProductPrice);
}

function handleDecrement(product: Product, currentQuantity: number): number {
  cartValues.forEach((p) => {
    if (product == p.item) {
      p.qty = currentQuantity - 1;
      if (currentQuantity - 1 == 0) {
        const index = cartValues.indexOf(p);
        cartValues.splice(index, 1);
        return 0;
      }
    }
  });

  return --currentQuantity;
}

function handleIncrement(qty: number): number {
  return ++qty;
}

function handleDelete(img: HTMLElement, product: Product, quantity: number) {
  img.addEventListener("click", (e) => {
    let clickedElement = e.target as HTMLElement;
    let grandParent = clickedElement.parentNode as HTMLElement;
    let grandGrandParent = grandParent.parentNode as HTMLElement;
    grandGrandParent.remove();
    cartValues.forEach((p) => {
      if (product == p.item) {
        const index = cartValues.indexOf(p);
        cartValues.splice(index, 1);
      }
    });
    let currentTotal = 0;
    cartValues.forEach((cartProduct) => {
      currentTotal += Number(cartProduct.item.price) * cartProduct.qty;
    });

    totalCalculatedPrice = currentTotal;
    updateTotalPrice();
  });
}

function displayTotalInfo() {
  let total_info = createHtml("div", "total");
  let totalTitle = createHtml("div", "totalTitle");
  total_info.appendChild(totalTitle);

  let total_price_total = createHtml("div", "totalPrice");
  total_info.appendChild(total_price_total);

  let totalTitlePrice = document.createTextNode(totalCalculatedPrice + " kr");
  total_price_total.appendChild(totalTitlePrice);

  let totalTitleText = document.createTextNode("Total");
  totalTitle.appendChild(totalTitleText);
  cart.appendChild(total_info);
}

function updatePrice(elementId: string, price: number) {
  let totalPriceDiv = document.getElementById(elementId) as HTMLElement;
  if (totalPriceDiv == null) {
    return;
  }

  totalPriceDiv.innerHTML = price + " kr";
}

function updateTotalPrice() {
  let totalPriceDiv = document.querySelector(".totalPrice") as HTMLElement;
  if (totalPriceDiv == null) {
    return;
  }
  totalPriceDiv.innerHTML = totalCalculatedPrice + " kr";
}

const cart = document.querySelector(".cart") as HTMLElement;
cart.appendChild(product_container);
readFromLocalStorage("cartValues");
displayTotalInfo();
checkout();

function checkout() {
  let buttonCheckout = document.querySelector(".btnlink") as HTMLElement;
  buttonCheckout.addEventListener("click", () => {
    if (cartValues.length == 0) {
      alert("Oops cart is empty!");
      buttonCheckout.setAttribute("href", "../index.html");
    } else {
      if (validateFields()) {
        alert("Fields are empty");
      }
      alert("Thanks for ordering our products!...");
      buttonCheckout.setAttribute("href", "../index.html");
      localStorage.clear();
    }
  });
}

function validateFields(): boolean {
  let email = document.getElementById("email") as HTMLInputElement;

  return email.value == "" || email.value == null;
}
