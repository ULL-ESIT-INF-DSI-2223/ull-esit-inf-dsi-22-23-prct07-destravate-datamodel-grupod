"use strict";
exports.__esModule = true;
exports.Ruta = void 0;
var Ruta = /** @class */ (function () {
    function Ruta(nombre, cordenadas_incio, cordenadas_fin, longitud, desnivel, usuarios_ya_realizados, tipo_ruta, calificacion) {
        this.nombre = nombre;
        this.cordenadas_incio = cordenadas_incio;
        this.cordenadas_fin = cordenadas_fin;
        this.longitud = longitud;
        this.desnivel = desnivel;
        this.usuarios_ya_realizados = usuarios_ya_realizados;
        this.tipo_ruta = tipo_ruta;
        this.calificacion = calificacion;
        this.id = Ruta.rutacount++;
        this.cordenadas_incio = cordenadas_incio;
        this.cordenadas_fin = cordenadas_fin;
        this.longitud = longitud;
        this.desnivel = desnivel;
        this.usuarios_ya_realizados = usuarios_ya_realizados;
        this.tipo_ruta = tipo_ruta;
        for (var i = 0; i < calificacion.length; i++) {
            this.calificacion.push(calificacion[i]);
        }
        this.calificacion_media =
            this.calificacion.reduce(function (a, b) { return a + b; }, 0) / this.calificacion.length;
    }
    Ruta.prototype.getNombre = function () {
        return this.nombre;
    };
    Ruta.prototype.getUsuarios = function () {
        return this.usuarios_ya_realizados;
    };
    Ruta.prototype.getDistancia = function () {
        return this.longitud;
    };
    Ruta.prototype.getTipoRuta = function () {
        return this.tipo_ruta;
    };
    Ruta.prototype.getCalificacionMedia = function () {
        return this.calificacion_media;
    };
    Ruta.rutacount = 0;
    Ruta.ids_rutas = [];
    return Ruta;
}());
exports.Ruta = Ruta;
