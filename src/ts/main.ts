import { CartItem } from "./models/cart";
import { createHtml } from "./helpers";
import {
  // addSamplePack,
  // pillOptions,
  // powderOptions,
  Product,
} from "./models/product";
export const inventory = [] as Product[];
addSamplePack();
// let cart: CartItem[] = []; // FÖRSTÖR KOD
// checkStorage() ? (cart = refreshCart() as CartItem[]) : (cart = []);

//#region TEST
if ((location.href = "index.html")) {
  testFunc();
}
function getItem(): Product {
  let id = sessionStorage.getItem("id");
  let it: Product = inventory.find((obj) => {
    return obj.id === id;
  }) as Product;
  return it;
}
let item: Product = getItem();
const img = createHtml("img", "prod__img") as HTMLImageElement;
img.setAttribute("src", item.imgLink); // get img by accessing object property
img.setAttribute("alt", "Product image");
const imgBox = document.querySelector(".prod__img-box") as HTMLDivElement;
imgBox.appendChild(img);
const itemInfo = document.querySelector(".prod__info") as HTMLDivElement;
const itemPrice = document.querySelector(".info__price") as HTMLSpanElement;
const itemLabel = document.querySelector(".info__lbl") as HTMLSpanElement;
itemPrice.innerHTML = item.price + " kr";
itemLabel.innerHTML = item.label + " || " + item.options;
itemInfo.appendChild(itemPrice);
itemInfo.appendChild(itemLabel);
const flavorSel = document.querySelector(
  ".prod__flav-sel"
) as HTMLSelectElement;
item.options.map((opt) => {
  let newOpt = createHtml("option", "item-opt");
  newOpt.innerHTML = opt;
  flavorSel.appendChild(newOpt);
});

function testFunc() {
  inventory.map((item: Product) => {
    console.log(item.id);
    testPrint(item);
  });
  function testPrint(item: Product) {
    let newDiv = createHtml("div", "testDiv"); // Create container
    newDiv.id = item.id; // Set container id to same as current Product.id
    let newImg = createHtml("img", "testImg"); // img
    newImg.setAttribute("alt", "product image"); // img alt text
    newImg.setAttribute("src", item.imgLink); // img alt text
    newDiv.appendChild(newImg); // append img to container
    let newTitle = createHtml("span", "testTitle"); // title text
    newTitle.innerHTML = item.label; // set title text to Product.label
    newDiv.appendChild(newTitle); // append title text to container
    document.body.appendChild(newDiv); // append container to body
    newDiv.addEventListener("click", () => {
      sessionStorage.setItem("id", item.id as string); // store id in sessionStorage
      console.log(sessionStorage.getItem("id"));
      location.href = "product.html"; // go to product page
      printHtml();
    });
  }
}

// Print product details on product page
function printHtml() {
  let item: Product = getItem();
  const img = createHtml("img", "prod__img") as HTMLImageElement;
  img.setAttribute("src", item.imgLink); // get img by accessing object property
  img.setAttribute("alt", "Product image");
  const imgBox = document.querySelector(".prod__img-box") as HTMLDivElement;
  imgBox.appendChild(img);
  const itemInfo = document.querySelector(".prod__info") as HTMLDivElement;
  const itemPrice = document.querySelector(".info__price") as HTMLSpanElement;
  const itemLabel = document.querySelector(".info__lbl") as HTMLSpanElement;
  itemPrice.innerHTML = item.price + " kr";
  itemLabel.innerHTML = item.label + " || " + item.options;
  itemInfo.appendChild(itemPrice);
  itemInfo.appendChild(itemLabel);
  const flavorSel = document.querySelector(
    ".prod__flav-sel"
  ) as HTMLSelectElement;
  item.options.map((opt) => {
    let newOpt = createHtml("option", "item-opt");
    newOpt.innerHTML = opt;
    flavorSel.appendChild(newOpt);
  });

  // if (item.isPills) {
  //   pillOptions.map((opt) => {
  //     let newOpt = createHtml("option", "pill-opt");
  //     newOpt.innerHTML = opt;
  //     flavorSel.appendChild(newOpt);
  //   });
  // } else {
  //   powderOptions.map((opt) => {
  //     let newOpt = createHtml("option", "pill-opt") as HTMLOptionElement;
  //     newOpt.innerHTML = opt;
  //     flavorSel.appendChild(newOpt);
  //   });
  // }

  //   item.pillOptions.map((opt) => {
  //     let newOpt = createHtml("option", "pill-opt");
  //     newOpt.innerHTML = opt;
  //     flavorSel.appendChild(newOpt);
  //   });

  //#endregion

  //#region QUANTITY SELECTION
  quantityGetSet();
  //#endregion

  //#region Item description
  printDescription(item);

  generateSuggestions();
}

//#region ---> FUNCTIONS
function printDescription(item: Product) {
  const descriptionBox = document.querySelector(
    ".prod__description"
  ) as HTMLDivElement;
  descriptionBox.innerHTML = item.description;
}
/* Initializers */
function quantityGetSet(toCart: boolean = false): void | number {
  const qtyIncrement: HTMLButtonElement = document.querySelector(
    ".prod__qty-btn--incr"
  ) as HTMLButtonElement;
  const qtyDecrement: HTMLButtonElement = document.querySelector(
    ".prod__qty-btn--decr"
  ) as HTMLButtonElement;
  const qtyInput: HTMLInputElement = document.getElementById(
    "qty"
  ) as HTMLInputElement;
  if (toCart) {
    return parseInt(qtyInput.value);
  } else {
    qtyIncrement.addEventListener("click", () => {
      let qty: number = parseInt(qtyInput.value);
      qty < 20 ? qty++ : console.log("error");
      qtyInput.value = qty.toString();
    });
    qtyDecrement.addEventListener("click", () => {
      let qty: number = parseInt(qtyInput.value);
      qty > 1 ? qty-- : console.log("error");
      qtyInput.value = qty.toString();
    });
    qtyInput.addEventListener("blur", () => {
      let qty: number = parseInt(qtyInput.value);
      qty > 20 ? (qty = 20) : qty < 1 ? (qty = 1) : (qty = qty);
      qtyInput.value = qty.toString();
    });
  }
}
/* Printers */
function printRandomObjects(
  promoSlots: HTMLSpanElement[],
  nums: number[],
  promoContainer: HTMLDivElement
) {
  for (let i = 0; i < promoSlots.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      let item: Product = inventory[j];
      let img = createHtml("img", "promo__prod-img");
      img.setAttribute("src", item.imgLink); // set img source
      promoSlots[i].appendChild(img);
      let txt = createHtml("span", "promo__prod-txt");
      txt.innerHTML = item.label;
      promoSlots[i].appendChild(txt);
      let link = createHtml("a", "promo__link");
      link.appendChild(promoSlots[i]);
      promoContainer.appendChild(link);
    }
  }
}
/* Generators */
function generateRandomInteger() {
  const nums: number[] = [];
  const goal: number = 4;
  while (nums.length !== goal) {
    let randomNumber: number = Math.floor(Math.random() * inventory.length + 1);
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
function generateSuggestions() {
  const promoContainer = document.querySelector(".promo") as HTMLDivElement;
  const promo1 = createHtml("span", "promo__prod-1");
  const promo2 = createHtml("span", "promo__prod-2");
  const promo3 = createHtml("span", "promo__prod-3");
  const promo4 = createHtml("span", "promo__prod-4");
  const promoSlots = [] as HTMLSpanElement[];
  promoSlots.push(promo1, promo2, promo3, promo4);
  const nums: number[] = generateRandomInteger(); // Generate 4 random numbers without duplicates for product suggestions
  printRandomObjects(promoSlots, nums, promoContainer); // Print randomized suggestions
}
// Storage
function getObj(): Product {
  let id = sessionStorage.getItem("id" as string);
  console.log(id);
  let obj: Product = inventory[-1];
  for (let i = 0; i < inventory.length; i++) {
    if (inventory[i].id === id) {
      obj = inventory[i];
    }
  }
  return obj;
}

function handleToCartClick() {
  let objectStrings = JSON.parse(localStorage.getItem("currentItem") as string);
  let reclassed: Product = objectStrings.map((item: Product) => {
    // Convert objects to proper class and store in new list
    return new Product(
      item.label,
      item.price,
      // item.options,
      item.description,
      item.imgLink,
      item.isPills
    ) as Product;
  });
  let qty = quantityGetSet(true) as number;
  cart.push(new CartItem(reclassed, qty));
  localStorage.setItem("cartContent", JSON.stringify(cart));
}

function addSamplePack() {
  let lorem: string =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, eaque ducimus? Distinctio doloremque inventore architecto fuga consequuntur et, doloribus nesciunt velit nisi, a blanditiis commodi soluta? Pariatur tenetur eum impedit placeat omnis accusantium magni, fuga reiciendis excepturi natus quam dignissimos autem, velit sit consequatur nam id repellendus consequuntur repellat totam dicta doloremque debitis. Aperiam quidem voluptate veniam temporibus consequatur, accusantium sit dignissimos a? Laborum vel illo nihil quae dignissimos reiciendis maiores autem eveniet eum nesciunt dolores dolore sit sed repellendus voluptas, exercitationem explicabo perspiciatis aut consequatur incidunt delectus ad! Molestiae vitae commodi laborum eos, velit facere dignissimos voluptatem quasi nam nemo accusamus qui odit impedit temporibus nostrum obcaecati exercitationem recusandae tenetur iste placeat! Iusto veniam, nesciunt temporibus fuga praesentium ab voluptatum, explicabo aut recusandae, totam suscipit earum. Quo molestiae animi omnis deleniti neque impedit numquam earum praesentium iusto, vitae dolores maxime, tempore optio quod! Facilis reiciendis excepturi placeat. Odit ipsum ipsam dignissimos sunt vero dolorem minus delectus provident laudantium sed, ab quia ut unde fugit explicabo blanditiis.";
  inventory.push(
    new Product(
      "BioTechUSA Tribooster, 60 caps",
      "229",
      // pillOptions,
      lorem,
      "https://www.tillskottsbolaget.se/bilder/artiklar/zoom/BIOTECH843_1.jpg?m=1625179915",
      true
    )
  );
  inventory.push(
    new Product(
      "Sportlab Limitless, 60 caps",
      "399",
      // pillOptions,
      lorem,
      "https://www.tillskottsbolaget.se/bilder/artiklar/zoom/SPORTLAB753_1.jpg?m=1654808842",
      true
    )
  );
  inventory.push(
    new Product(
      "Sportlab Focus, NOO-PEPT, 90 caps",
      "249",
      // pillOptions,
      lorem,
      "https://www.tillskottsbolaget.se/bilder/artiklar/zoom/SPORTLAB7853_1.jpg?m=1654808909",
      true
    )
  );
  inventory.push(
    new Product(
      "Sportlab Androgenic Testo Growth, 120 caps",
      "349",
      // powderOptions,
      lorem,
      "https://www.tillskottsbolaget.se/bilder/artiklar/zoom/SPORTLAB001_1.jpg?m=1654808783",
      false
    )
  );
  inventory.push(
    new Product(
      "Chaos Crew Turkesterone HIGH DOSE - 500 mg, 90 caps",
      "599",
      // powderOptions,
      lorem,
      "https://www.tillskottsbolaget.se/bilder/artiklar/zoom/CHAOS7583_1.jpg?m=1656360007",
      false
    )
  );
  inventory.push(
    new Product(
      "SOLID Nutrition BLACK LINE Turkesterone - 333 mg, 90 caps",
      "549",
      // powderOptions,
      lorem,
      "https://www.tillskottsbolaget.se/bilder/artiklar/zoom/SOLID75832_1.jpg?m=1661374360",
      false
    )
  );
  inventory.push(
    new Product(
      "Optimum Nutrition Opti-Women, 60 caps",
      "189",
      // pillOptions,
      lorem,
      "https://www.tillskottsbolaget.se/bilder/artiklar/zoom/OPTIMUM003_1.jpg?m=1614199819",
      true
    )
  );
  inventory.push(
    new Product(
      "Swedish Supplements Vitamin & Mineral Complex",
      "299",
      // pillOptions,
      lorem,
      "https://www.tillskottsbolaget.se/bilder/artiklar/zoom/SSVMC_1.jpg?m=1653342949",
      true
    )
  );
  inventory.push(
    new Product(
      "Star Nutrition Ultimate Omega-3, 90 caps, 80%",
      "229",
      // pillOptions,
      lorem,
      "https://www.tillskottsbolaget.se/bilder/artiklar/zoom/STAR022_1.jpg?m=1614199775",
      true
    )
  );
  inventory.push(
    new Product(
      "Scitec Nutrition Omega 3, 100 caps",
      "139",
      // pillOptions,
      lorem,
      "https://www.tillskottsbolaget.se/bilder/artiklar/zoom/SCITEC0012_1.jpg?m=1657827568",
      true
    )
  );
}
//#endregion
