"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
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
    BaseCollection.prototype.findElement = function (nombre) {
        return __spreadArray([], this.collection.values(), true).find(function (element) { return element.nombre === nombre; });
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
