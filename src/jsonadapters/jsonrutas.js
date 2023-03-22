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
exports.JsonRutas = void 0;
var rutas_collection_1 = require("../collections/rutas_collection");
var rutas_1 = require("../datatypes/rutas");
var lowdb_1 = require("lowdb");
var FileSync_1 = require("lowdb/adapters/FileSync");
var JsonRutas = /** @class */ (function (_super) {
    __extends(JsonRutas, _super);
    function JsonRutas() {
        var _this = _super.call(this) || this;
        _this.db = (0, lowdb_1["default"])(new FileSync_1["default"]("./data/rutas.json"));
        _this.db.defaults({ rutas: [] }).write();
        if (_this.db.has("rutas").value()) {
            var rutas = _this.db.get("rutas").value();
            rutas.forEach(function (item) {
                var ruta = new rutas_1.Ruta(item.nombre, item.coordenadas_inicio, item.coordenadas_fin, item.longitud, item.desnivel, item.usuarios_ya_realizados, item.tipo_ruta, item.calificacion);
                _super.prototype.addElement.call(_this, ruta);
            });
        }
        else {
            _this.db.set("rutas", []).write();
        }
        return _this;
    }
    JsonRutas.prototype.addElement = function (element) {
        var rutas = _super.prototype.addElement.call(this, element);
        this.storeRutas();
        return rutas;
    };
    JsonRutas.prototype.removeElement = function (id) {
        _super.prototype.removeElement.call(this, id);
        this.storeRutas();
    };
    JsonRutas.prototype.storeRutas = function () {
        this.db.set("rutas", __spreadArray([], this.collection.values(), true)).write();
    };
    return JsonRutas;
}(rutas_collection_1.RutaCollection));
exports.JsonRutas = JsonRutas;
