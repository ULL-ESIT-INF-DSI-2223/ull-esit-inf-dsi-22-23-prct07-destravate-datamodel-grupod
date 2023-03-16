"use strict";
exports.__esModule = true;
exports.Reto = void 0;
var Reto = /** @class */ (function () {
    function Reto(nombre) {
        this.id = Reto.retoCount++;
        this.nombre = nombre;
        this._ruta = [];
        this._tipo_reto = "";
        this._km_totales = 0;
        this._usuarios_realizando_reto = [];
    }
    Reto.retoCount = 0;
    Reto.ids_retos = [];
    return Reto;
}());
exports.Reto = Reto;
