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
exports.JsonUsuarios = void 0;
var usuario_collection_1 = require("../collections/usuario_collection");
var usuarios_1 = require("../datatypes/usuarios");
var lowdb_1 = require("lowdb");
var FileSync_1 = require("lowdb/adapters/FileSync");
var JsonUsuarios = /** @class */ (function (_super) {
    __extends(JsonUsuarios, _super);
    function JsonUsuarios() {
        var _this = _super.call(this) || this;
        _this.db = (0, lowdb_1["default"])(new FileSync_1["default"]("./data/usuarios.json"));
        _this.db.defaults({ usuarios: [] }).write();
        if (_this.db.has("usuarios").value()) {
            var usuarios = _this.db.get("usuarios").value();
            usuarios.forEach(function (item) {
                var usuario = new usuarios_1.Usuario(item.nombre, item.actividad, item.amigos, item.stats, item.rutas_favoritas, item.retos_activos, item.historico_rutas);
                _super.prototype.addElement.call(_this, usuario);
            });
        }
        else {
            _this.db.set("usuarios", []).write();
        }
        return _this;
    }
    JsonUsuarios.prototype.addElement = function (element) {
        var usuario = _super.prototype.addElement.call(this, element);
        this.storeUsuario();
        return usuario;
    };
    JsonUsuarios.prototype.removeElement = function (id) {
        _super.prototype.removeElement.call(this, id);
        this.storeUsuario();
    };
    JsonUsuarios.prototype.storeUsuario = function () {
        this.db.set("usuarios", __spreadArray([], this.collection.values(), true)).write();
    };
    return JsonUsuarios;
}(usuario_collection_1.UsuarioCollection));
exports.JsonUsuarios = JsonUsuarios;
