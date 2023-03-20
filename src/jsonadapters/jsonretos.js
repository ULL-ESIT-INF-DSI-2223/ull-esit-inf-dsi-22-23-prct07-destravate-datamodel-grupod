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
exports.JsonRetos = void 0;
var retos_collection_1 = require("../collections/retos_collection");
var retos_1 = require("../datatypes/retos");
var lowdb_1 = require("lowdb");
var FileSync_1 = require("lowdb/adapters/FileSync");
var JsonRetos = /** @class */ (function (_super) {
    __extends(JsonRetos, _super);
    function JsonRetos() {
        var _this = _super.call(this) || this;
        _this.db = (0, lowdb_1["default"])(new FileSync_1["default"]("./data/retos.json"));
        _this.db.defaults({ retos: [] }).write();
        if (_this.db.has("retos").value()) {
            var retos = _this.db.get("retos").value();
            retos.forEach(function (item) {
                var reto = new retos_1.Reto(item.nombre, item.ruta, item.tipo_reto, item.km_totales, item.usuarios_realizando_reto);
                _super.prototype.addElement.call(_this, reto);
            });
        }
        else {
            _this.db.set("retos", []).write();
        }
        return _this;
    }
    JsonRetos.prototype.addElement = function (element) {
        var retos = _super.prototype.addElement.call(this, element);
        this.storeRetos();
        return retos;
    };
    JsonRetos.prototype.removeElement = function (id) {
        _super.prototype.removeElement.call(this, id);
        this.storeRetos();
    };
    JsonRetos.prototype.storeRetos = function () {
        this.db.set("retos", __spreadArray([], this.collection.values(), true)).write();
    };
    return JsonRetos;
}(retos_collection_1.RetoCollection));
exports.JsonRetos = JsonRetos;
