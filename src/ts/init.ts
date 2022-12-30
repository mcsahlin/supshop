function init(page: string) {
  switch (page) {
    case "product.html":
      const btnBack = document.getElementById("btn-back") as HTMLButtonElement;
      btnBack.addEventListener("click", history.back);
    case "cart.html":
  }
}
