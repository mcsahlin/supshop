export function createHtml(
  htmlTag: string,
  className: string,
  id: string = ""
): HTMLElement {
  const newElement = document.createElement(htmlTag) as HTMLElement;
  newElement.classList.add(className);
  newElement.id = id;
  return newElement;
}
