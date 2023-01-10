import { createHtml, createHtmlElementWithClassAndId } from './helpers';
import { addSamplePack, Product } from './models/product';
import { loadHome, product_container } from './start_page';
import { CartItem } from './models/cartitem';
import { loadProduct } from './page_product';
import { Page } from './models/pages';
const d = document;
export const page: Page = new Page();
export const inventory: Product[] = addSamplePack();
export const cart: CartItem[] = [];
// Create page elements and store in list
export const mainContainer = d.getElementById('main') as HTMLDivElement;
d.body.appendChild(mainContainer);
const homePage = createHtmlElementWithClassAndId(
  'section',
  'page page--home',
  'homepage'
);
const productPage = createHtmlElementWithClassAndId(
  'section',
  'page page--product',
  'productpage'
);
const cartPage = createHtmlElementWithClassAndId(
  'section',
  'page page--cart',
  'cartpage'
);
const checkoutPage = createHtmlElementWithClassAndId(
  'section',
  'page page--checkout',
  'checkoutpage'
);
const confirmationPage = createHtmlElementWithClassAndId(
  'section',
  'page page--confirmation',
  'confirmationpage'
);
export const sections: HTMLElement[] = [];
sections.push(homePage, productPage, cartPage, checkoutPage, confirmationPage);
sections.map((s) => {
  mainContainer.appendChild(s);
  s.style.display = 'none';
});
init();
export function init(dest?: string) {
  if (dest) {
    sections.map((s) => {
      s.className.substring(11) === dest ? display(s, true) : display(s, false);
      console.log(s.className.substring(11));
    });
    loadPage(dest);
  }
  // else {
  //   sections[0].style.display = 'block';
  //   mainContainer.appendChild(product_container);
  //   // loadPage(page.home);
  //   loadHome();
  // }
}
function display(el: HTMLElement, activate: boolean) {
  activate ? (el.style.display = 'block') : (el.style.display = 'none');
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
