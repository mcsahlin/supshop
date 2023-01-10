import {
  createHtml,
  createHtmlElementWithClassAndId,
  getCurrentProductById,
} from './helpers';
import {
  addSamplePack,
  pillOptions,
  powderOptions,
  Product,
} from './models/product';
import { generateSuggestions } from './services/promos';
import { CartItem } from './models/cartitem';
import { Page } from './models/pages';
import { loadProduct } from './page_product';
import { loadHome } from './start_page';
const d = document;
const page: Page = new Page();
export const inventory: Product[] = addSamplePack();
export const cart: CartItem[] = [];
// Create page elements and store in list
const mainContainer = createHtml('main', 'main');
d.body.appendChild(mainContainer);
const homePage = createHtml('section', 'page page--home');
const productPage = createHtml('section', 'page page--product');
const cartPage = createHtml('section', 'page page--cart');
const checkoutPage = createHtml('section', 'page page--checkout');
const confirmationPage = createHtml('section', 'page page--confirmation');
export const sections: HTMLElement[] = [];
sections.push(homePage, productPage, cartPage, checkoutPage, confirmationPage);
sections.map((s) => {
  s.style.display = 'none';
  mainContainer.appendChild(s);
});
init();
function init(dest: string = 'home') {
  sections.map((s) => {
    s.className.substring(11) === dest ? display(s, true) : display(s, false);
  });
}
function display(el: HTMLElement, activate: boolean) {
  activate ? (el.style.display = 'block') : (el.style.display = 'none');
}
export function loadPage(dest: string, product?: Product) {
  init(dest);
  switch (dest) {
    case page.home:
      loadHome();
      break;
    case page.product:
      if (product) {
        loadProduct(product);
      }
      break;
  }
}
