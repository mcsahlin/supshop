// Toggle hamburger menu
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

// Create base
const body = document.body;
const mainDiv = createHtml("main", "main");
body.appendChild(mainDiv);

// Create and append "previous page button"
const backBtn = createHtml("button", "btn-back");
mainDiv.appendChild(backBtn);
backBtn.addEventListener("click", history.back);

// Create and append item showcase container
const itemContainer = createHtml("section", "details");
mainDiv.appendChild(itemContainer);

// Create item image container
const imgBox = createHtml("div", "details__img-box");

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

function createHtml(htmlTag: string, className: string): HTMLElement {
  const newElement = document.createElement(htmlTag) as HTMLElement;
  newElement.classList.add(className);
  return newElement;
}
