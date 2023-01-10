import { addSamplePack, Product } from './models/product';
import { createHtml, createHtmlElementWithClassAndId } from './helpers';
import { CartItem } from './models/cartitem';
import { sections } from './main';
const inventory: Product[] = addSamplePack();
const cartValue: CartItem[] = [];

// StartPage start________________________Y
export function loadHome() {
  console.log(sections[0]);
  const product_container = sections[0];
  //counter for each products to render
  let counter = 0;
  //iterate over each product
  inventory.forEach((prodcut) => populateStaticData(prodcut));

  function populateStaticData(product: Product) {
    let item_box_div = createHtmlElementWithClassAndId(
      'div',
      'product_box',
      'product_box_' + counter
    );

    //load image from product object
    let img = new Image(120, 120);
    img.className = 'img_item';
    img.setAttribute('src', product.imgLink);
    img.setAttribute('alt', 'Product image');
    item_box_div.appendChild(img);

    let product_info = createHtmlElementWithClassAndId(
      'div',
      'product_info',
      'product_info_' + counter
    );

    //get price from product and append to paragraph tag
    let item_price = product.price + ' kr';
    let pg = createHtml('p', 'txt_paragraph');
    let txt = document.createTextNode(item_price);
    pg.appendChild(txt);

    let add_to_cart = createHtmlElementWithClassAndId(
      'button',
      'btn_add_to_cart',
      'btn_add_to_cart_' + counter
    );
    add_to_cart.innerHTML = 'Add to Cart';
    let prod_name = product.label;
    let prod_link = createHtml('a', 'a_prod_name');
    prod_link.innerHTML = prod_name;
    if (prod_link !== null) {
      prod_link.addEventListener(
        'click',
        () => localStorage.setItem('product_id', product.id),
        false
      );
      prod_link.setAttribute(
        'href',
        `http://localhost:1234/product/${product.id}`
      );

      product_info.appendChild(prod_link);
      product_info.appendChild(pg);
      product_info.appendChild(add_to_cart);
      item_box_div.appendChild(product_info);

      if (counter === 6) {
        let slide_box = createHtml('div', 'slide_box');
        product_container.appendChild(slide_box);
        let banner_box = createHtml('div', 'banner');
        product_container.appendChild(banner_box);
      }

      product_container.appendChild(item_box_div);
      counter += 1;
    }

    const footer = document.getElementById('footer');
    if (footer !== null) {
      product_container.appendChild(footer);
    }
    document.body.appendChild(product_container);

    function addToCart() {
      let btn_list = document.getElementsByClassName(
        'btn_add_to_cart'
      ) as HTMLCollectionOf<HTMLElement>;
      for (let i = 0; i < btn_list.length; i++) {
        btn_list[i].addEventListener('click', () => {
          let info = document.getElementById(
            'product_info_' + i
          ) as HTMLElement;

          let to_be_removed = document.getElementById(
            'btn_add_to_cart_' + i
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
        'div',
        'button_container',
        'btn_container_' + id_number
      );
      let btnMinus = createHtmlElementWithClassAndId(
        'button',
        'btn_minus',
        'btn_minus_' + id_number
      );
      btnMinus.innerHTML = '-';
      btnContainer.appendChild(btnMinus);

      let txtField = createHtmlElementWithClassAndId(
        'input',
        'input_number',
        'input_number_' + id_number
      );
      txtField.setAttribute('type', 'number');
      txtField.setAttribute('value', '1'); //initial value
      btnContainer.appendChild(txtField);

      let btnAdd = createHtmlElementWithClassAndId(
        'button',
        'btn_plus',
        'btn_plus_' + id_number
      );
      btnAdd.innerHTML = '+';
      btnContainer.appendChild(btnAdd);

      return btnContainer;
    }

    //minus current value \
    function minusFromCurrentValue(currentElement: number) {
      let minus = document.getElementById('btn_minus_' + currentElement);
      if (minus !== null)
        minus.addEventListener('click', () => {
          let txt_input = document.getElementById(
            'input_number_' + currentElement
          ) as HTMLInputElement;
          let current_value: number = Number(txt_input.value) - 1;
          txt_input.value = current_value.toString();
          let product_in_cart = new CartItem(
            inventory[currentElement],
            current_value
          );
          addToCartBox(product_in_cart);
          if (current_value == 0) {
            let to_remove = document.getElementById(
              'btn_container_' + currentElement
            ) as HTMLElement;
            to_remove.parentNode?.removeChild(to_remove);
            let add_to_cart = createHtmlElementWithClassAndId(
              'button',
              'btn_add_to_cart',
              'btn_add_to_cart_' + currentElement
            );
            add_to_cart.innerHTML = 'Add to Cart';
            let product_info = document.getElementById(
              'product_info_' + currentElement
            );
            product_info?.appendChild(add_to_cart);
            addToCart();
          }
        });
    }

    //add to current value
    function addToCurrentValue(currentElement: number): void {
      let plus = document.getElementById('btn_plus_' + currentElement);
      if (plus !== null)
        plus.addEventListener('click', () => {
          let btn_plus = document.getElementById(
            'input_number_' + currentElement
          ) as HTMLInputElement;
          let current_value: number = Number(btn_plus.value) + 1;
          let product_in_cart = new CartItem(
            inventory[currentElement],
            current_value
          );
          addToCartBox(product_in_cart);
          btn_plus.value = current_value.toString();
        });
    }

    function addToCartBox(product_in_cart: CartItem) {
      //let shopping_cart = document.getElementById("shopping_cart");
      let product_ids_in_cart = cartValue.map((ca) => ca.id);
      let current_cart = product_in_cart;
      if (cartValue.length === 0) {
        cartValue.push(product_in_cart);
        console.log(
          'Adding for the first and Selected product id: ' + product_in_cart.id
        );
        console.log(product_in_cart.quantity);

        // let shopping_cart = document.getElementById("shopping_cart") as HTMLElement;
        // shopping_cart.innerHTML = "product id: "+product_in_cart.item.imgLink+"And quantity: "+product_in_cart.qty;
      } else if (
        cartValue !== null &&
        !product_ids_in_cart.includes(product_in_cart.id)
      ) {
        cartValue.push(product_in_cart);
        cartValue.forEach((cart) => {
          current_cart = cart;
          // let shopping_cart = document.getElementById("shopping_cart") as HTMLElement;
          // shopping_cart.innerHTML = "product id: "+cart.item.id+"And quantity: "+cart.qty;
          console.log('Selected product id: ' + cart.id);
          console.log(cart.quantity);
        });
      } else {
        console.log('updating quantity ');
        //current_cart.qty
        console.log(current_cart.quantity);

        // let shopping_cart = document.getElementById("shopping_cart") as HTMLElement;
        //shopping_cart.innerHTML = "product id: "+current_cart.item.id+"And quantity: "+current_cart.qty;
      }

      let prices: number = 0;
      cartValue.forEach((p) => {
        prices += Number(p.price) * p.quantity;
      });

      console.log(
        'Totat products in cart: ' +
          cartValue.length +
          ' total price: ' +
          prices
      );
    }
  }
}
