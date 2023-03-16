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
exports.JsonUsuario = void 0;
var usuario_collection_1 = require("../collections/usuario_collection");
var lowdb_1 = require("lowdb");
var FileSync_1 = require("lowdb/adapters/FileSync");
var JsonUsuario = /** @class */ (function (_super) {
    __extends(JsonUsuario, _super);
    function JsonUsuario() {
        var _this = _super.call(this) || this;
        _this.db = (0, lowdb_1["default"])(new FileSync_1["default"]("../../../data/usuarios.json"));
        return _this;
    }
    JsonUsuario.prototype.addElement = function (usuario) {
        this.db.set("id", usuario.id).write();
    };
    return JsonUsuario;
}(usuario_collection_1.UsuarioCollection));
exports.JsonUsuario = JsonUsuario;
