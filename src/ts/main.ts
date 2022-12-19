const body = document.body;
const mainDiv = createHtml("main", "main") as HTMLDivElement;
body.appendChild(mainDiv);

const backBtn = createHtml("button", "btn-back") as HTMLButtonElement;
mainDiv.appendChild(backBtn);
backBtn.addEventListener("click", history.back);
const productContainer = createHtml("section", "details") as HTMLDivElement;
mainDiv.appendChild(productContainer);

// Item image
const imgBox = createHtml("div", "details__img-box");

// Item price and label
const infoBox = createHtml("div", "details__info-box");
const itemPrice = createHtml("h2", "details__price");
const itemName = createHtml("p", "details__name");

// Item options
const selectionBox = createHtml("div", "details__selection");
const itemOptions = createHtml("select", "details__options");
const itemOptionsLabel = createHtml("label", "details__options-label");
const increaseBtn = createHtml("button", "details__increase-btn");
const decreaseBtn = createHtml("button", "details__decrease-btn");
const quantityInput = createHtml("input", "details__quantity");
const buyBtn = createHtml("button", "details__buy-btn");

// Item description
const descriptionBox = createHtml("article", "details__description");

// Product suggestions
const otherProducts = createHtml("div", "details__otherProducts");

function createHtml(htmlTag: string, className: string): HTMLElement {
  const newElement = document.createElement(htmlTag) as HTMLElement;
  newElement.classList.add(className);
  return newElement;
}

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
