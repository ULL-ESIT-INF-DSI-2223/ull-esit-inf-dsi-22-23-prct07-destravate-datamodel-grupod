"use strict";
exports.__esModule = true;
exports.BaseCollection = void 0;
var BaseCollection = /** @class */ (function () {
    function BaseCollection() {
        this.collection = new Map();
    }
    BaseCollection.prototype.addElement = function (element) {
        this.collection.set(element.id, element);
    };
    BaseCollection.prototype.removeElement = function (id) {
        this.collection["delete"](id);
    };
    BaseCollection.prototype.getElement = function (id) {
        return this.collection.get(id);
    };
    return BaseCollection;
}());
exports.BaseCollection = BaseCollection;
