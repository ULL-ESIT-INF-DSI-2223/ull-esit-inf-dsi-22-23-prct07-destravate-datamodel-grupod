"use strict";
exports.__esModule = true;
exports.Usuario = void 0;
var Usuario = /** @class */ (function () {
    function Usuario(nombre, actividad, amigos, stats, rutas_favoritas, retos_activos, historico_rutas) {
        this.nombre = nombre;
        this.actividad = actividad;
        this.amigos = amigos;
        this.stats = stats;
        this.rutas_favoritas = rutas_favoritas;
        this.retos_activos = retos_activos;
        this.historico_rutas = historico_rutas;
        this.id = Usuario.usercount++;
    }
    Usuario.prototype.getActividad = function () {
        return this.actividad;
    };
    Usuario.prototype.getAmigos = function () {
        return this.amigos;
    };
    Usuario.prototype.getStats = function () {
        return this.stats;
    };
    Usuario.prototype.getRutasFavoritas = function () {
        return this.rutas_favoritas;
    };
    Usuario.prototype.getRetosActivos = function () {
        return this.retos_activos;
    };
    Usuario.prototype.getHistoricoRutas = function () {
        return this.historico_rutas;
    };
    Usuario.prototype.getNombre = function () {
        return this.nombre;
    };
    Usuario.prototype.getKmRecorridosSemana = function () {
        return this.stats.getWeekDistance();
    };
    Usuario.prototype.getKmRecorridosMes = function () {
        return this.stats.getMonthDistance();
    };
    Usuario.prototype.getKmRecorridosAnio = function () {
        return this.stats.getYearDistance();
    };
    Usuario.usercount = 0;
    return Usuario;
}());
exports.Usuario = Usuario;
