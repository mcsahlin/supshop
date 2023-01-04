"use strict";
exports.__esModule = true;
var product_1 = require("./models/product");
var helpers_1 = require("./helpers");
var inventory = (0, product_1.addSamplePack)();
var btnBack = document.getElementById("btn-back");
//btnBack.addEventListener("click", history.back);
var imgBox = document.querySelector(".prod__img-box");
// LOAD ID.img
var img = (0, helpers_1.createHtml)("img", "prod__img");
img.setAttribute("src", inventory[0].imgLink);
img.setAttribute("alt", "Product image");
//imgBox.appendChild(img);
//#endregion
//#region Price and label
var itemInfo = document.querySelector(".prod__info");
var itemPrice = document.querySelector(".info__price");
var itemLabel = document.querySelector(".info__lbl");
//itemPrice.innerHTML = inventory[0].price + " kr";
//itemLabel.innerHTML = inventory[0].label + " || " + inventory[0].options;
itemInfo.appendChild(itemPrice);
itemInfo.appendChild(itemLabel);
//#endregion
//#region Item options
var flavorSel = document.querySelector(".prod__flav-sel");
if (inventory[0].isPills) {
    product_1.pillOptions.map(function (opt) {
        var newOpt = (0, helpers_1.createHtml)("option", "pill-opt");
        newOpt.innerHTML = opt;
        flavorSel.appendChild(newOpt);
    });
}
else {
    product_1.powderOptions.map(function (opt) {
        var newOpt = (0, helpers_1.createHtml)("option", "pill-opt");
        newOpt.innerHTML = opt;
        flavorSel.appendChild(newOpt);
    });
}
//#endregion
//#region QUANTITY SELECTION
var qtyIncrement = document.querySelector(".prod__qty-btn--incr");
var qtyDecrement = document.querySelector(".prod__qty-btn--decr");
var qtyInput = document.getElementById("qty");
qtyIncrement.addEventListener("click", function () {
    var qty = parseInt(qtyInput.value);
    qty < 20 ? qty++ : console.log("error");
    qtyInput.value = qty.toString();
});
qtyDecrement.addEventListener("click", function () {
    var qty = parseInt(qtyInput.value);
    qty > 1 ? qty-- : console.log("error");
    qtyInput.value = qty.toString();
});
qtyInput.addEventListener("blur", function () {
    var qty = parseInt(qtyInput.value);
    qty > 20 ? (qty = 20) : qty < 1 ? (qty = 1) : (qty = qty);
    qtyInput.value = qty.toString();
});
//#endregion
//#region Item description
var descriptionBox = document.querySelector(".prod__description");
descriptionBox.innerHTML = inventory[0].description;
//#endregion
//#region Product suggestions
var promo1 = document.querySelector(".promo__prod-1");
var promo2 = document.querySelector(".promo__prod-2");
var promo3 = document.querySelector(".promo__prod-3");
var promo4 = document.querySelector(".promo__prod-4");
var promoSlots = [];
promoSlots.push(promo1, promo2, promo3, promo4);
for (var i = 0; i < promoSlots.length; i++) {
    var img_1 = (0, helpers_1.createHtml)("img", "promo__prod-img");
    img_1.setAttribute("src", inventory[i].imgLink);
    var txt = (0, helpers_1.createHtml)("span", "promo__prod-txt");
    txt.innerHTML = inventory[i].label;
    promoSlots[i].appendChild(img_1);
    promoSlots[i].appendChild(txt);
}
//#endregion
// StartPage start________________________Yo
console.log(inventory);
var product_container = (0, helpers_1.createHtml)("div", "product_box_start_page");
var counter = 0; //counter for each products to render
//iterate over each product
inventory.forEach(function (prodcut) {
    var item_box_div = (0, helpers_1.createHtmlElementWithClassAndId)("div", "product_box", "product_box_" + counter);
    //load image from product object
    var img = new Image(120, 120);
    img.className = "img_item";
    img.setAttribute("src", prodcut.imgLink);
    img.setAttribute("alt", "Product image");
    item_box_div.appendChild(img);
    var product_info = (0, helpers_1.createHtmlElementWithClassAndId)("div", "product_info", "product_info_" + counter);
    //get price from product and append to paragraph tag
    var item_price = prodcut.price + " kr";
    var pg = (0, helpers_1.createHtml)("p", "txt_paragraph");
    var txt = document.createTextNode(item_price);
    pg.appendChild(txt);
    var add_to_cart = (0, helpers_1.createHtmlElementWithClassAndId)("button", "btn_add_to_cart", "btn_add_to_cart_" + counter);
    add_to_cart.innerHTML = "Add to Cart";
    var prod_name = prodcut.label;
    var prod_link = (0, helpers_1.createHtml)("a", "a_prod_name");
    var url = new URL(prodcut.id, "product.html/");
    prod_link.setAttribute("href", url.toString());
    //prod_link.setAttribute("target", "_blank");
    prod_link.innerHTML = prod_name;
    product_info.appendChild(prod_link);
    product_info.appendChild(pg);
    product_info.appendChild(add_to_cart);
    item_box_div.appendChild(product_info);
    if (counter === 6) {
        var slide_box = (0, helpers_1.createHtml)("div", "slide_box");
        product_container.appendChild(slide_box);
        var banner_box = (0, helpers_1.createHtml)("div", "banner");
        product_container.appendChild(banner_box);
    }
    product_container.appendChild(item_box_div);
    counter += 1;
});
var footer = document.getElementById("footer");
if (footer !== null) {
    product_container.appendChild(footer);
}
document.body.appendChild(product_container);
var btn_list = document.getElementsByClassName("btn_add_to_cart");
var _loop_1 = function (i) {
    btn_list[i].addEventListener("click", function () {
        var _a;
        var info = document.getElementById("product_info_" + i);
        var to_be_removed = document.getElementById("btn_add_to_cart_" + i);
        (_a = to_be_removed.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(to_be_removed);
        var btnContainer = createCartButtons(i);
        info.appendChild(btnContainer);
        minusFromCurrentValue(i);
        addToCurrentValue(i);
    });
};
for (var i = 0; i < btn_list.length; i++) {
    _loop_1(i);
}
//add to Cart buttons
function createCartButtons(id_number) {
    var btnContainer = (0, helpers_1.createHtmlElementWithClassAndId)("div", "button_container", "btn_container_" + id_number);
    var btnMinus = (0, helpers_1.createHtmlElementWithClassAndId)("button", "btn_minus", "btn_minus_" + id_number);
    btnMinus.innerHTML = "-";
    btnContainer.appendChild(btnMinus);
    var txtField = (0, helpers_1.createHtmlElementWithClassAndId)("input", "input_number", "input_number_" + id_number);
    txtField.setAttribute("type", "number");
    txtField.setAttribute("value", "1"); //initial value
    btnContainer.appendChild(txtField);
    var btnAdd = (0, helpers_1.createHtmlElementWithClassAndId)("button", "btn_plus", "btn_plus_" + id_number);
    btnAdd.innerHTML = "+";
    btnContainer.appendChild(btnAdd);
    return btnContainer;
}
//minus current value \
function minusFromCurrentValue(currentElement) {
    var minus = document.getElementById("btn_minus_" + currentElement);
    if (minus !== null)
        minus.addEventListener("click", function () {
            var _a;
            var btn_minus = document.getElementById("input_number_" + currentElement);
            var current_value = Number(btn_minus.value) - 1;
            btn_minus.value = current_value.toString();
            if (current_value == 0) {
                var minus_1 = document.getElementById("btn_container_" + currentElement);
                (_a = minus_1.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(minus_1);
                var add_to_cart = (0, helpers_1.createHtmlElementWithClassAndId)("button", "btn_add_to_cart", "btn_add_to_cart_" + currentElement);
                add_to_cart.innerHTML = "Add to Cart";
                console.log(add_to_cart);
                var product_info = document.getElementById("product_info_" + currentElement);
                product_info === null || product_info === void 0 ? void 0 : product_info.appendChild(add_to_cart);
            }
        });
}
//add to current value
function addToCurrentValue(currentElement) {
    var plus = document.getElementById("btn_plus_" + currentElement);
    if (plus !== null)
        plus.addEventListener("click", function (event) {
            var btn_plus = document.getElementById("input_number_" + currentElement);
            var current_value = Number(btn_plus.value) + 1;
            btn_plus.value = current_value.toString();
        });
}
