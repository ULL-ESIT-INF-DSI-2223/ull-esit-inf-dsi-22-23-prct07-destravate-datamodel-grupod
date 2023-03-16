"use strict";
exports.__esModule = true;
exports.Usuario = void 0;
var stats_1 = require("./stats");
var Usuario = /** @class */ (function () {
    function Usuario(username) {
        this.id = Usuario.usercount++;
        this.nombre = username;
        this.actividad = undefined;
        this.amigos = [];
        this.stats = new stats_1.Stats();
        this.rutas_favoritas = [];
        this.retos_activos = [];
        this.historico_rutas = [];
    }
    Usuario.usercount = 0;
    return Usuario;
}());
exports.Usuario = Usuario;
