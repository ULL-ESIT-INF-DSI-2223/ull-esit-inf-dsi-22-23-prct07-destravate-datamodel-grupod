"use strict";
exports.__esModule = true;
exports.Grupo = void 0;
var Grupo = /** @class */ (function () {
    function Grupo(nombre, miembros, group_stats, clasificacion, rutas_favoritas, historico_rutas) {
        this.nombre = nombre;
        this.miembros = miembros;
        this.group_stats = group_stats;
        this.clasificacion = clasificacion;
        this.rutas_favoritas = rutas_favoritas;
        this.historico_rutas = historico_rutas;
        this.id = Grupo.groupcount++;
    }
    Grupo.prototype.getMiembros = function () {
        return this.miembros;
    };
    Grupo.prototype.getKmRecorridosAnio = function () {
        return this.group_stats.getYearDistance();
    };
    Grupo.prototype.getKmRecorridosMes = function () {
        return this.group_stats.getMonthDistance();
    };
    Grupo.prototype.getKmRecorridosSemana = function () {
        return this.group_stats.getWeekDistance();
    };
    Grupo.groupcount = 0;
    return Grupo;
}());
exports.Grupo = Grupo;
