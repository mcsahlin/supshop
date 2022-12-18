function createHtml(htmlTag: string): HTMLElement {
  return document.createElement(htmlTag);
}

const menuBtn = document.querySelector(".topnav__menu-btn") as HTMLDivElement;
let menuActive: boolean = false;
menuBtn.addEventListener("click", () => {
  if (!menuActive) {
    menuBtn.classList.add("topnav__menu-btn--active");
    menuActive = true;
  } else {
    menuBtn.classList.remove("topnav__menu-btn--active");
    menuActive = false;
  }
});
