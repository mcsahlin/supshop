function init(page: string) {
  switch (page) {
    case "product.html":
      const btnBack = document.getElementById("btn-back") as HTMLButtonElement;
      btnBack.addEventListener("click", history.back);
    case "cart.html":
  }
}
// 1. Toggle all classes off
// 2. Toggle selected class on
