"use strict";
exports.__esModule = true;
var product_1 = require("./modules/product");
var _functions_1 = require("./_functions");
var inventory = (0, product_1.addSamplePack)();
// StartPage start________________________Yo
var product_container = (0, _functions_1.createHtml)("div", "product_box_start_page");
var counter = 1;
inventory.forEach(function (prodcut) {
    var item_box = (0, _functions_1.createHtml)("div", "product_box_" + counter);
    var img = new Image(120, 120);
    img.className = "img_item";
    img.setAttribute("src", prodcut.imgLink);
    img.setAttribute("alt", "Product image");
    item_box.appendChild(img);
    var product_info = (0, _functions_1.createHtml)("div", "product_info");
    var item_price = prodcut.price + " kr";
    var pg = (0, _functions_1.createHtml)("p", "txt_paragraph");
    var txt = document.createTextNode(item_price);
    pg.appendChild(txt);
    var add_to_cart = document.createElement("button");
    add_to_cart.id = "btn_add_to_cart";
    add_to_cart.innerHTML = "Add to Cart";
    var prod_name = prodcut.label;
    var prod_link = (0, _functions_1.createHtml)("a", "a_prod_name");
    prod_link.setAttribute('href', "product.html/" + prodcut.id);
    prod_link.setAttribute("target", "_blank");
    prod_link.innerHTML = prod_name;
    product_info.appendChild(prod_link);
    product_info.appendChild(pg);
    product_info.appendChild(add_to_cart);
    item_box.appendChild(product_info);
    if (counter === 5) {
        var banner_box = (0, _functions_1.createHtml)("div", "banner");
        product_container.appendChild(banner_box);
        var slide_box = (0, _functions_1.createHtml)("div", "slide_box");
        product_container.appendChild(slide_box);
    }
    product_container.appendChild(item_box);
    counter += 1;
});
var footer = document.getElementById("footer");
if (footer !== null) {
    product_container.appendChild(footer);
}
document.body.appendChild(product_container);
var btnClicked = document.getElementById("btn_add_to_cart");
console.log("got button" + btnClicked);
if (btnClicked !== null)
    btnClicked.addEventListener("onClick", function () {
        console.log("Clicked....");
        var btnAdd = (0, _functions_1.createHtml)("button", "btn_add");
        btnAdd.innerHTML = "+";
        var info = document.querySelector("product_info");
        info !== null ? info.appendChild(btnAdd) : null;
        var txtField = (0, _functions_1.createHtml)("input", "input_number");
        txtField.setAttribute("type", "number");
        info !== null ? info.appendChild(txtField) : null;
        var btnMinus = (0, _functions_1.createHtml)("button", "btn_minus");
        btnMinus.innerHTML = "-";
        info !== null ? info.appendChild(btnMinus) : null;
        if (info !== null) {
            product_container.appendChild(info);
        }
    });
