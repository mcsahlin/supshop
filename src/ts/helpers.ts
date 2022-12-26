export function createHtml(htmlTag: string, className: string): HTMLElement {
  const newElement = document.createElement(htmlTag) as HTMLElement;
  newElement.classList.add(className);
  return newElement;
}

export function createHtmlElementWithClassAndId(
  htmlTagName: string,
  className: string,
  idName: string
): HTMLElement {
  let htmlElement = createHtml(htmlTagName, className);
  htmlElement.setAttribute("id", idName);

  return htmlElement;
}
