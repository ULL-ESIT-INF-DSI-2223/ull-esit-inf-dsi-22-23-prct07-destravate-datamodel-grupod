"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.GrupoCollection = void 0;
var base_collection_1 = require("./base_collection");
var GrupoCollection = /** @class */ (function (_super) {
    __extends(GrupoCollection, _super);
    function GrupoCollection() {
        return _super.call(this) || this;
    }
    return GrupoCollection;
}(base_collection_1.BaseCollection));
exports.GrupoCollection = GrupoCollection;
