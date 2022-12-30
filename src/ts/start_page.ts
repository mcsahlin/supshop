
import { addSamplePack, Product} from "./models/product";
  import { createHtml, createHtmlElementWithClassAndId } from "./helpers";

  const inventory: Product[] = addSamplePack();

  // StartPage start________________________Y
  
  const swiper = new Swiper(".swiper", {
    
    
    // Optional parameters
    autoplay:{
        delay:3000,
        disableOnInteraction: true,
    },
 
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

  });


  ///______________________________________________

  const product_container = createHtml("div", "product_box_start_page");
  let counter = 0; //counter for each products to render
  
  //iterate over each product
  inventory.forEach((prodcut) => {
    let item_box_div = createHtmlElementWithClassAndId(
      "div",
      "product_box",
      "product_box_" + counter
    );
  
    //load image from product object
    let img = new Image(120, 120);
    img.className = "img_item";
    img.setAttribute("src", prodcut.imgLink);
    img.setAttribute("alt", "Product image");
    item_box_div.appendChild(img);
  
    let product_info = createHtmlElementWithClassAndId(
      "div",
      "product_info",
      "product_info_" + counter
    );
  
    //get price from product and append to paragraph tag
    let item_price = prodcut.price + " kr";
    let pg = createHtml("p", "txt_paragraph");
    let txt = document.createTextNode(item_price);
    pg.appendChild(txt);
  
    let add_to_cart = createHtmlElementWithClassAndId(
      "button",
      "btn_add_to_cart",
      "btn_add_to_cart_" + counter
    );
    add_to_cart.innerHTML = "Add to Cart";
  
    let prod_name = prodcut.label;
    let prod_link = createHtml("a", "a_prod_name");
    let url = new URL(prodcut.id, "http://localhost:1234/"); //the port number is variable should be picked while starting parcel.
    prod_link.setAttribute("href", url.toString());
    //prod_link.setAttribute("target", "_blank");
    prod_link.innerHTML = prod_name;
  
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
  });
  
  const footer = document.getElementById("footer");
  if (footer !== null) {
    product_container.appendChild(footer);
  }
  
  document.body.appendChild(product_container);
  
  let btn_list = document.getElementsByClassName(
    "btn_add_to_cart"
  ) as HTMLCollectionOf<HTMLElement>;
  
  for (let i = 0; i < btn_list.length; i++) {
    btn_list[i].addEventListener("click", () => {
      let info = document.getElementById("product_info_" + i) as HTMLElement;
  
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
        let btn_minus = document.getElementById(
          "input_number_" + currentElement
        ) as HTMLInputElement;
        let current_value: number = Number(btn_minus.value) - 1;
        btn_minus.value = current_value.toString();
  
        if (current_value == 0) {
          let minus = document.getElementById(
            "btn_container_" + currentElement
          ) as HTMLElement;
          minus.parentNode?.removeChild(minus);
          let add_to_cart = createHtmlElementWithClassAndId(
            "button",
            "btn_add_to_cart",
            "btn_add_to_cart_" + currentElement
          );
          add_to_cart.innerHTML = "Add to Cart";
          console.log(add_to_cart);
          let product_info = document.getElementById(
            "product_info_" + currentElement
          );
          product_info?.appendChild(add_to_cart);
        }
      });
  }
  
  //add to current value
  function addToCurrentValue(currentElement: number): void {
    let plus = document.getElementById("btn_plus_" + currentElement);
    if (plus !== null)
      plus.addEventListener("click", function (event) {
        let btn_plus = document.getElementById(
          "input_number_" + currentElement
        ) as HTMLInputElement;
        let current_value: number = Number(btn_plus.value) + 1;
        btn_plus.value = current_value.toString();
      });
  }
  