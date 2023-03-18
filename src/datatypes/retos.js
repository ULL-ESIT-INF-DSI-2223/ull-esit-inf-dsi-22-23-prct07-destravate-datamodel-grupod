"use strict";
exports.__esModule = true;
exports.Reto = void 0;
var Reto = /** @class */ (function () {
    function Reto(nombre, ruta, tipo_reto, km_totales, usuarios_realizando_reto) {
        this.nombre = nombre;
        this.ruta = ruta;
        this.tipo_reto = tipo_reto;
        this.km_totales = km_totales;
        this.usuarios_realizando_reto = usuarios_realizando_reto;
        this.id = Reto.retoCount++;
    }
    Reto.retoCount = 0;
    Reto.ids_retos = [];
    return Reto;
}());
exports.Reto = Reto;
