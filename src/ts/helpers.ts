export function createHtml(htmlTag: string, className: string): HTMLElement {
  const newElement = document.createElement(htmlTag) as HTMLElement;
  newElement.classList.add(className);
  return newElement;
}
