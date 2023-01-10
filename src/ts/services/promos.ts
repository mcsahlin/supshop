import { createHtml } from '../helpers';
import { inventory } from '../main';
import { Product } from '../models/product';

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
export function generateSuggestions() {
  const promoContainer = document.querySelector('.promo') as HTMLDivElement;
  const promo1 = createHtml('span', 'promo__prod-1');
  const promo2 = createHtml('span', 'promo__prod-2');
  const promo3 = createHtml('span', 'promo__prod-3');
  const promo4 = createHtml('span', 'promo__prod-4');
  const promoSlots = [] as HTMLSpanElement[];
  promoSlots.push(promo1, promo2, promo3, promo4);
  const nums: number[] = generateRandomInteger(); // Generate 4 random numbers without duplicates for product suggestions
  printRandomObjects(promoSlots, nums, promoContainer); // Print randomized suggestions
}
function printRandomObjects(
  promoSlots: HTMLSpanElement[],
  nums: number[],
  promoContainer: HTMLDivElement
) {
  for (let i = 0; i < promoSlots.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      let item: Product = inventory[j];
      let img = createHtml('img', 'promo__prod-img');
      img.setAttribute('src', item.imgLink); // set img source
      promoSlots[i].appendChild(img);
      let txt = createHtml('span', 'promo__prod-txt');
      txt.innerHTML = item.label;
      promoSlots[i].appendChild(txt);
      let link = createHtml('a', 'promo__link');
      link.appendChild(promoSlots[i]);
      promoContainer.appendChild(link);
    }
  }
}
