import { Product } from './models/product';

export function createHtml(htmlTag: string, className: string): HTMLElement {
  const newElement = document.createElement(htmlTag) as HTMLElement;
  newElement.className = className;
  return newElement;
}

export function createHtmlElementWithClassAndId(
  htmlTagName: string,
  className: string,
  idName: string
): HTMLElement {
  let htmlElement = createHtml(htmlTagName, className);
  htmlElement.setAttribute('id', idName);

  return htmlElement;
}
export function getId(): string | null {
  console.log(sessionStorage.getItem('product_id'));
  let id: string | null = localStorage.getItem('product_id') || null;
  // let productId = id == null ? "" : id;
  localStorage.removeItem('product_id');
  return id;
}
export function getCurrentProductById(
  productId: string,
  sourceList: Product[]
): Product | null {
  sourceList.find((obj) => {
    return obj.id === productId;
  });
  return null;
}
