import { createHtml } from './helpers';
import { addSamplePack, Product } from './models/product';
import { loadHome } from './start_page';
import { CartItem } from './models/cartitem';
import { loadProduct } from './page_product';
import { Page } from './models/pages';
const d = document;
export const page: Page = new Page();
export const inventory: Product[] = addSamplePack();
export const cart: CartItem[] = [];
// Create page elements and store in list
const mainContainer = d.getElementById('main') as HTMLDivElement;
d.body.appendChild(mainContainer);
const homePage = createHtml('section', 'page page--home');
const productPage = createHtml('section', 'page page--product');
const cartPage = createHtml('section', 'page page--cart');
const checkoutPage = createHtml('section', 'page page--checkout');
const confirmationPage = createHtml('section', 'page page--confirmation');
export const sections: HTMLElement[] = [];
sections.push(homePage, productPage, cartPage, checkoutPage, confirmationPage);
sections.map((s) => {
  mainContainer.appendChild(s);
  s.style.display = 'none';
});
init();
export function init(dest: string = 'home') {
  sections.map((s) => {
    s.className.substring(11) === dest ? display(s, true) : display(s, false);
    console.log(s.className.substring(11));
  });
  loadPage(dest);
}
function display(el: HTMLElement, activate: boolean) {
  activate ? (el.style.display = 'flex') : (el.style.display = 'none');
}
function loadPage(dest: string, product?: Product) {
  switch (dest) {
    case page.home:
      loadHome();
      break;
    case page.product:
      if (!product) {
        break;
      } else {
        loadProduct(product);
        break;
      }
  }
}
