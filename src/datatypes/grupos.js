"use strict";
exports.__esModule = true;
exports.Grupo = void 0;
var stats_1 = require("./stats");
var Grupo = /** @class */ (function () {
    function Grupo(groupname) {
        this.id = Grupo.groupcount++;
        this.nombre = groupname;
        this.miembros = [];
        this.group_stats = new stats_1.Stats();
        this.clasificacion = [];
        this.rutas_favoritas = [];
        this.historico_rutas = [];
    }
    Grupo.groupcount = 0;
    return Grupo;
}());
exports.Grupo = Grupo;
