"use strict";
exports.__esModule = true;
exports.createHtmlElementWithClassAndId = exports.createHtml = void 0;
function createHtml(htmlTag, className) {
    var newElement = document.createElement(htmlTag);
    newElement.classList.add(className);
    return newElement;
}
exports.createHtml = createHtml;
function createHtmlElementWithClassAndId(htmlTagName, className, idName) {
    var htmlElement = createHtml(htmlTagName, className);
    htmlElement.setAttribute("id", idName);
    return htmlElement;
}
exports.createHtmlElementWithClassAndId = createHtmlElementWithClassAndId;
