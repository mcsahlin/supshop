import {
  createHtml,
  createHtmlElementWithClassAndId,
  getCurrentProductById,
} from './helpers';
import { inventory, sections } from './main';
import { Product } from './models/product';

export function loadProduct(product: Product) {
  const container = sections[1];
  // ---------- CHECK
  console.log(container.className);
  //#region BACK BUTTON
  const back = document.createElement('button');
  back.setAttribute('type', 'submit');
  back.addEventListener('click', () => window.history.back());
  // const backBtnForm = createHtml('form', 'btn-back--form');
  // const backBtnContainer = createHtml('div', 'btn-back__container');
  // const backBtnArrow = createHtml('img', 'btn--back__img');
  // backBtnArrow.setAttribute('src', './assets/icons/arrow-back-white.png');
  // const backBtn = createHtmlElementWithClassAndId(
  //   'input',
  //   'btn btn--back',
  //   'btn-back'
  // );
  // backBtn.setAttribute('type', 'button');
  // backBtn.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   history.back();
  // });
  // backBtnContainer.appendChild(backBtnArrow);
  // backBtnContainer.appendChild(backBtn);
  // backBtnForm.appendChild(backBtnContainer);
  // container.appendChild(backBtnContainer);
  //#endregion BACK BUTTON

  //#region PRODUCT DISPLAY
  const superContainer = createHtml('div', 'container--super');
  container.appendChild(superContainer);
  //#region IMAGE CONTAINER
  const imageContainer = createHtml('div', 'card__imgbox container');
  const img = createHtml('img', 'card__img') as HTMLImageElement;
  img.setAttribute('src', product.imgLink);
  img.setAttribute('alt', 'Product image');
  imageContainer.appendChild(img);
  superContainer.appendChild(imageContainer);
  //#endregion IMAGE CONTAINER

  const productDetailContainer = createHtml('div', 'card__detailbox');
  superContainer.appendChild(productDetailContainer);
  const productDetails = createHtml('div', 'card__details container');
  productDetailContainer.appendChild(productDetails);
  const priceDetail = createHtml('span', 'card__price');
  priceDetail.innerHTML = product.price + ' kr';
  productDetails.appendChild(priceDetail);
  const labelDetail = createHtml('span', 'card__title');
  labelDetail.innerHTML = product.label + ' || ' + inventory[0].options;
  productDetails.appendChild(labelDetail);

  const optionsContainer = createHtml('div', 'opt container');
  productDetailContainer.appendChild(optionsContainer);

  const productOptions = createHtml('div', 'opt__flavsize');
  optionsContainer.appendChild(productOptions);

  const flavorMarkupLabel = createHtml('label', 'opt__flavsize-heading');
  flavorMarkupLabel.setAttribute('for', 'opt__flavsize-select');
  flavorMarkupLabel.innerHTML = 'Choose flavor / size';
  productOptions.appendChild(flavorMarkupLabel);

  const optionsDropdown = createHtmlElementWithClassAndId(
    'select',
    'opt__flavsize-select',
    'opt__flavsize-select'
  );
  optionsDropdown.setAttribute('placeholder', "Click 'n pick..");
  product.options.map((opt) => {
    let newOpt = createHtml('option', 'fz__alt') as HTMLOptionElement;
    newOpt.innerHTML = opt;
    optionsDropdown.appendChild(newOpt);
  });

  productOptions.appendChild(optionsDropdown);

  const quantitySelectionContainer = createHtml('div', 'opt__qty');
  optionsContainer.appendChild(quantitySelectionContainer);

  const quantityMarkupLabel = createHtml('label', 'opt__qty-heading');
  quantityMarkupLabel.setAttribute('for', 'qty');
  quantitySelectionContainer.appendChild(quantityMarkupLabel);
  //#region QUANTITY
  //#region INPUT
  const qtyInput = document.createElement('input');
  qtyInput.id = 'qty';
  qtyInput.className = 'opt__input';
  qtyInput.setAttribute('type', 'number');
  qtyInput.setAttribute('value', '1');
  qtyInput.addEventListener('blur', () => {
    let qty: number = parseInt(qtyInput.value);
    qty > 20 ? (qty = 20) : qty < 1 ? (qty = 1) : (qty = qty);
    qtyInput.value = qty.toString();
  });
  quantityMarkupLabel.appendChild(qtyInput);
  //#endregion QUANTITY INPUT
  //#region DECREASE BUTTON
  const decreaseBtn = createHtml('button', 'opt__qty-btn opt__qty-btn--decr');
  decreaseBtn.setAttribute('type', 'button');
  decreaseBtn.innerHTML = '-';
  decreaseBtn.addEventListener('click', () => {
    let qty: number = parseInt(qtyInput.value);
    qty > 1 ? qty-- : console.log('error');
    qtyInput.value = qty.toString();
  });
  quantityMarkupLabel.appendChild(decreaseBtn);
  //#endregion DECREASE BUTTON
  //#region INCREASE BUTTON
  const increaseBtn = createHtml('button', 'opt__qty-btn opt__qty-btn--add');
  increaseBtn.setAttribute('type', 'button');
  increaseBtn.innerHTML = '+';
  increaseBtn.addEventListener('click', () => {
    let qty: number = parseInt(qtyInput.value);
    qty < 20 ? qty++ : console.log('error');
    qtyInput.value = qty.toString();
  });
  quantityMarkupLabel.appendChild(increaseBtn);
  //#endregion DECREASE BUTTON
  //#endregion QUANTITY

  // Buy button
  const buyBtn = createHtml('button', 'btn opt__btn--buy btn--buy');
  buyBtn.innerHTML = 'Add to cart';
  buyBtn.setAttribute('type', 'button');
  quantitySelectionContainer.appendChild(buyBtn);

  // FIX BEM -- Product Description
  const productDescription = createHtml(
    'article',
    'description container container--description'
  );
  container.appendChild(productDescription);
  const descriptionText = createHtml('p', 'description__content');
  productDescription.appendChild(descriptionText);
  descriptionText.innerHTML = product.description;

  container.appendChild(generateSuggestions());

  // Suggestion printer
  function printRandomObjects(
    promoSlots: HTMLSpanElement[],
    nums: number[],
    promoContainer: HTMLElement
  ): HTMLElement {
    for (let i = 0; i < promoSlots.length; i++) {
      for (let j = 0; j < nums.length; j++) {
        let item: Product = inventory[j];
        let img = createHtml('img', 'suggest__img');
        img.setAttribute('src', item.imgLink); // set img source
        promoSlots[i].appendChild(img);
        let txt = createHtml('span', 'suggest__title');
        txt.innerHTML = item.label;
        promoSlots[i].appendChild(txt);
        let link = createHtml('a', 'suggest__link');
        link.appendChild(promoSlots[i]);
        promoContainer.appendChild(link);
      }
    }
    return promoContainer;
  }
  /* Random number generator */
  function generateRandomInteger() {
    const nums: number[] = [];
    const goal: number = 4;
    while (nums.length !== goal) {
      let randomNumber: number = Math.floor(
        Math.random() * inventory.length + 1
      );
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
  // Suggestion generator
  function generateSuggestions() {
    const promoContainer = createHtml('div', 'suggest');
    const promo1 = createHtml('span', 'suggest__boxA');
    const promo2 = createHtml('span', 'suggest__boxB');
    const promo3 = createHtml('span', 'suggest__boxC');
    const promo4 = createHtml('span', 'suggest__boxD');
    const promoSlots = [] as HTMLSpanElement[];
    promoSlots.push(promo1, promo2, promo3, promo4);
    const nums: number[] = generateRandomInteger(); // Generate 4 random numbers without duplicates for product suggestions
    printRandomObjects(promoSlots, nums, promoContainer); // Print randomized suggestions
    //#region Price and label
    return promoContainer;
  }
}
