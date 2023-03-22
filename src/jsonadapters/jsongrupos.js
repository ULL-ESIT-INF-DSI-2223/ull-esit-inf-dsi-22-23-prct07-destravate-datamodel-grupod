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
exports.JsonGrupos = void 0;
var grupos_collection_1 = require("../collections/grupos_collection");
var grupos_1 = require("../datatypes/grupos");
var lowdb_1 = require("lowdb");
var FileSync_1 = require("lowdb/adapters/FileSync");
var JsonGrupos = /** @class */ (function (_super) {
    __extends(JsonGrupos, _super);
    function JsonGrupos() {
        var _this = _super.call(this) || this;
        _this.db = (0, lowdb_1["default"])(new FileSync_1["default"]("./data/grupos.json"));
        _this.db.defaults({ grupos: [] }).write();
        if (_this.db.has("grupos").value()) {
            var grupos = _this.db.get("grupos").value();
            grupos.forEach(function (item) {
                var grupo = new grupos_1.Grupo(item.nombre, item.miembros, item.group_stats, item.clasificacion, item.rutas_favoritas, item.historico_rutas);
                _super.prototype.addElement.call(_this, grupo);
            });
        }
        else {
            _this.db.set("grupos", []).write();
        }
        return _this;
    }
    JsonGrupos.prototype.addElement = function (element) {
        var grupos = _super.prototype.addElement.call(this, element);
        this.storeGrupos();
        return grupos;
    };
    JsonGrupos.prototype.removeElement = function (id) {
        _super.prototype.removeElement.call(this, id);
        this.storeGrupos();
    };
    JsonGrupos.prototype.storeGrupos = function () {
        this.db.set("grupos", __spreadArray([], this.collection.values(), true)).write();
    };
    return JsonGrupos;
}(grupos_collection_1.GrupoCollection));
exports.JsonGrupos = JsonGrupos;
