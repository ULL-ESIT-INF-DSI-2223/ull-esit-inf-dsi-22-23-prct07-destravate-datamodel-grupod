"use strict";
exports.__esModule = true;
exports.BaseCollection = void 0;
var BaseCollection = /** @class */ (function () {
    function BaseCollection() {
        this.collection = new Map();
    }
    BaseCollection.prototype.addElement = function (element) {
        this.collection.set(element.id, element);
        return element.id;
    };
    BaseCollection.prototype.removeElement = function (id) {
        this.collection["delete"](id);
    };
    BaseCollection.prototype.getElement = function (id) {
        return this.collection.get(id);
    };
    BaseCollection.prototype.findElement = function (element) {
        return this.collection.get(element.id);
    };
    BaseCollection.prototype.length = function () {
        return this.collection.size;
    };
    BaseCollection.prototype.forEach = function (callback) {
        this.collection.forEach(callback);
    };
    return BaseCollection;
}());
exports.BaseCollection = BaseCollection;
