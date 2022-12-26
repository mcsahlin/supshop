"use strict";
exports.__esModule = true;
exports.createHtml = void 0;
function createHtml(htmlTag, className) {
    var newElement = document.createElement(htmlTag);
    newElement.classList.add(className);
    return newElement;
}
exports.createHtml = createHtml;
