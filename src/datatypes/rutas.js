"use strict";
exports.__esModule = true;
exports.Ruta = void 0;
var Ruta = /** @class */ (function () {
    function Ruta(nombre) {
        this.id = Ruta.rutacount++;
        this.nombre = nombre;
        this.cordenadas_incio = [0, 0];
        this.cordenadas_fin = [0, 0];
        this.longitud = 0;
        this.desnivel = 0;
        this.usuarios_ya_realizados = [];
        this.tipo_ruta = "";
        this.calificacion = 0;
    }
    Ruta.prototype.getNombre = function () {
        return this.nombre;
    };
    Ruta.rutacount = 0;
    Ruta.ids_rutas = [];
    return Ruta;
}());
exports.Ruta = Ruta;
