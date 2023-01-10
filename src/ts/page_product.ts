import {
  createHtml,
  createHtmlElementWithClassAndId,
  getCurrentProductById,
} from './helpers';
import { inventory, sections } from './main';
import { Product, pillOptions, powderOptions } from './models/product';

export function loadProduct(product: Product) {
  const backBtnForm = createHtml('form', 'btn-back-form');
  const backBtnContainer = createHtml('div', 'btn-back__container');
  const backBtnArrow = createHtml('img', 'btn--back__img');
  const backBtn = createHtmlElementWithClassAndId(
    'input',
    'btn' + 'btn--back',
    'btn-back'
  );
  backBtn.setAttribute('type', 'button');
  backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    history.back();
  });
  backBtnContainer.appendChild(backBtnArrow);
  backBtnContainer.appendChild(backBtn);
  backBtnForm.appendChild(backBtnContainer);

  const container = sections[1];
  const superContainer = createHtml('div', 'container--super');

  // Image container
  const imageContainer = createHtml('div', 'product__img-box' + 'container');
  const img = createHtml('img', 'prod__img') as HTMLImageElement;
  img.setAttribute('src', product.imgLink);
  img.setAttribute('alt', 'Product image');
  imageContainer.appendChild(img);
  superContainer.appendChild(imageContainer);

  const productDetailContainer = createHtml('div', 'product__info');
  superContainer.appendChild(productDetailContainer);

  const productDetails = createHtml('div', 'product__details' + 'container');
  productDetailContainer.appendChild(productDetails);

  const priceDetail = createHtml('span', 'details__price');
  priceDetail.innerHTML = product.price + ' kr';
  productDetails.appendChild(priceDetail);

  const labelDetail = createHtml('span', 'details__lbl');
  labelDetail.innerHTML = product.label + ' || ' + inventory[0].options;
  productDetails.appendChild(labelDetail);

  const optionsContainer = createHtml('div', 'product__opt-box' + 'container');
  productDetailContainer.appendChild(optionsContainer);

  const productOptions = createHtml('div', 'product__opt');
  optionsContainer.appendChild(productOptions);

  const flavorMarkupLabel = createHtml('label', 'product__flav-lbl');
  flavorMarkupLabel.setAttribute('for', 'product__flav-sel');
  flavorMarkupLabel.innerHTML = 'Choose flavor / size';
  productOptions.appendChild(flavorMarkupLabel);

  const optionsDropdown = createHtmlElementWithClassAndId(
    'select',
    'product__flav-sel',
    'product__flav-sel'
  );
  optionsDropdown.setAttribute('placeholder', "Click 'n pick..");
  if (product.isPills) {
    pillOptions.map((opt) => {
      let newOpt = createHtml('option', 'pill-opt');
      newOpt.innerHTML = opt;
      optionsDropdown.appendChild(newOpt);
    });
  } else {
    powderOptions.map((opt) => {
      let newOpt = createHtml('option', 'pill-opt') as HTMLOptionElement;
      newOpt.innerHTML = opt;
      optionsDropdown.appendChild(newOpt);
    });
  }

  productOptions.appendChild(optionsDropdown);

  const quantitySelectionContainer = createHtml(
    'div',
    'product__qty-container'
  );
  optionsContainer.appendChild(quantitySelectionContainer);

  const quantityMarkupLabel = createHtml('label', 'product__qty-label');
  quantityMarkupLabel.setAttribute('for', 'qty');
  quantitySelectionContainer.appendChild(quantityMarkupLabel);

  //Decrease button
  const decreaseBtn = createHtml(
    'button',
    'product__qty-btn' + 'product__qty-btn--decr'
  );
  decreaseBtn.setAttribute('type', 'button');
  decreaseBtn.innerHTML = '-';
  quantityMarkupLabel.appendChild(decreaseBtn);

  // Quantity input field
  const qtyInput = createHtmlElementWithClassAndId(
    'input',
    'product__qty-input',
    'qty'
  );
  qtyInput.setAttribute('type', 'number');
  qtyInput.setAttribute('value', '1');
  quantityMarkupLabel.appendChild(qtyInput);

  // Increase button
  const increaseBtn = createHtml(
    'button',
    'product__qty-btn' + 'product__qty-btn--incr'
  );
  increaseBtn.setAttribute('type', 'button');
  increaseBtn.innerHTML = '+';
  increaseBtn.addEventListener('click', () => {
    let qty: number = parseInt(qtyInput.value);
    qty < 20 ? qty++ : console.log('error');
    qtyInput.value = qty.toString();
  });
  quantityMarkupLabel.appendChild(increaseBtn);

  decreaseBtn.addEventListener('click', () => {
    let qty: number = parseInt(qtyInput.value);
    qty > 1 ? qty-- : console.log('error');
    qtyInput.value = qty.toString();
  });
  qtyInput.addEventListener('blur', () => {
    let qty: number = parseInt(qtyInput.value);
    qty > 20 ? (qty = 20) : qty < 1 ? (qty = 1) : (qty = qty);
    qtyInput.value = qty.toString();
  });

  descriptionText.innerHTML = product.description;
  // Buy button
  const buyBtn = createHtml('button', 'btn' + 'product__btn-buy' + 'btn--buy');
  buyBtn.innerHTML = 'Add to cart';
  buyBtn.setAttribute('type', 'button');
  quantitySelectionContainer.appendChild(buyBtn);

  // FIX BEM -- Product Description
  const productDescription = createHtml(
    'article',
    'product__description' + 'container' + 'container--description'
  );

  const descriptionText = createHtml('p', 'specs');
  productDescription.appendChild(descriptionText);
  const productSuggestions = createHtml('div', 'promo-section');

  container.appendChild(backBtnForm);
  container.appendChild(superContainer);
  container.appendChild(productDescription);
  container.appendChild(productSuggestions);

  const promoHeading = createHtml('h3', 'promo__heading');
  promoHeading.innerHTML = 'Others also bought:';
  productSuggestions.appendChild(promoHeading);
  const promos = createHtml('div', 'promo' + 'container');
  productSuggestions.appendChild(promos);

  //#region Price and label
}
