"use strict";
exports.__esModule = true;
exports.App = void 0;
var usuarios_1 = require("./usuarios");
var rutas_1 = require("./rutas");
var retos_1 = require("./retos");
var stats_1 = require("./stats");
// import { JsonUsuario } from "./jsonadapters/jsonusuarios";
var readline = require("readline");
var inquirer = require("inquirer");
var Commandos;
(function (Commandos) {
    Commandos["CrearUsuario"] = "Crear un usuario";
    Commandos["MostrarUsuarios"] = "Mostrar usuarios";
    Commandos["ModificarUsuario"] = "Modificar un usuario";
    Commandos["CrearRuta"] = "Crear una ruta";
    Commandos["MostrarRutas"] = "Mostrar rutas";
    Commandos["ModificarRuta"] = "Modificar una ruta";
    Commandos["CrearReto"] = "Crear un reto";
    Commandos["MostrarRetos"] = "Mostrar retos";
    Commandos["ModificarReto"] = "Modificar un reto";
    Commandos["CrearGrupo"] = "Crear un grupo";
    Commandos["MostrarGrupos"] = "Mostrar grupos";
    Commandos["ModificarGrupo"] = "Modificar un grupo";
    Commandos["Salir"] = "Salir";
})(Commandos || (Commandos = {}));
var App = /** @class */ (function () {
    function App() {
        this.usuarios = [];
        this.rutas = [];
        this.retos = [];
        this.grupos = [];
        this.stats = new stats_1.Stats();
    }
    App.prototype.setUsuarios = function (usuarios) {
        this.usuarios = usuarios;
    };
    App.prototype.setRutas = function (rutas) {
        this.rutas = rutas;
    };
    App.prototype.setRetos = function (retos) {
        this.retos = retos;
    };
    App.prototype.setGrupos = function (grupos) {
        this.grupos = grupos;
    };
    App.prototype.setStats = function (stats) {
        this.stats = stats;
    };
    App.prototype.start = function () {
        var _this = this;
        console.log("Bienvenido a DeStravaTe");
        inquirer
            .prompt([
            {
                type: "list",
                name: "command",
                message: "¿Que quieres hacer?",
                choices: ["Iniciar sesión", "Registrarse"]
            },
        ])
            .then(function (answers) {
            if (answers["command"] === "Iniciar sesión") {
                _this.login();
            }
            else {
                _this.register();
            }
        });
    };
    App.prototype.login = function () {
        var _this = this;
        console.clear();
        inquirer
            .prompt([
            {
                type: "input",
                name: "username",
                message: "Introduce tu nombre de usuario"
            },
        ])
            .then(function (answers) {
            var username = answers["username"];
            var user = _this.usuarios.find(function (u) { return u.getNombre() === username; });
            if (user !== undefined) {
                _this.mainMenu();
            }
            else {
                console.log("Usuario no encontrado");
                _this.login();
            }
        });
    };
    App.prototype.register = function () {
        var _this = this;
        console.clear();
        inquirer
            .prompt([
            {
                type: "input",
                name: "username",
                message: "Introduce tu nombre de usuario"
            },
        ])
            .then(function (answers) {
            var username = answers["username"];
            var user = _this.usuarios.find(function (u) { return u.getNombre() === username; });
            if (user !== undefined) {
                console.log("Usuario ya existente");
                _this.register();
            }
            else {
                _this.usuarios.push(new usuarios_1.Usuario(username, undefined, [], new stats_1.Stats(), [], [], []));
                _this.mainMenu();
            }
        });
    };
    App.prototype.mainMenu = function () {
        var _this = this;
        console.clear();
        inquirer
            .prompt([
            {
                type: "list",
                name: "command",
                message: "¿Que quieres hacer?",
                choices: Object.values(Commandos)
            },
        ])
            .then(function (answers) {
            switch (answers["command"]) {
                case Commandos.CrearUsuario:
                    break;
                case Commandos.MostrarUsuarios:
                    break;
                case Commandos.ModificarUsuario:
                    break;
                case Commandos.CrearRuta:
                    break;
                case Commandos.MostrarRutas:
                    _this.mostrarRutas();
                    break;
                case Commandos.ModificarRuta:
                    break;
                case Commandos.CrearReto:
                    break;
                case Commandos.MostrarRetos:
                    break;
                case Commandos.ModificarReto:
                    break;
                case Commandos.CrearGrupo:
                    break;
                case Commandos.MostrarGrupos:
                    break;
                case Commandos.ModificarGrupo:
                    break;
                case Commandos.Salir:
                    console.log("Hasta luego!");
                    break;
            }
        });
        console.clear();
    };
    App.prototype.mostrarRutas = function () {
        var _this = this;
        console.clear();
        inquirer
            .prompt([
            {
                type: "list",
                name: "rutas",
                message: "¿Como quieres ver la lista de rutas?",
                choices: [
                    "Mostrar todas las rutas por orden alfabético",
                    "Mostrar todas las rutas por cantidad de usuarios",
                    "Mostrar todas las rutas por distancia",
                    "Mostrar todas las rutas por calificacion media",
                    "Mostrar todas las rutas de correr",
                    "Mostrar todas las rutas de bicicleta",
                ]
            },
        ])
            .then(function (answers) {
            switch (answers.rutas) {
                case "Mostrar todas las rutas por orden alfabético":
                    _this.mostrarRutasAlfabeticamente();
                    break;
                case "Mostrar todas las rutas por cantidad de usuarios":
                    _this.mostrarRutasPorCantidadDeUsuarios();
                    break;
                case "Mostrar todas las rutas por distancia":
                    _this.mostrarRutasPorDistancia();
                    break;
                case "Mostrar todas las rutas por calificacion media":
                    _this.mostrarRutasPorCalificacionMedia();
                    break;
                case "Mostrar todas las rutas de correr":
                    _this.mostrarRutasDeCorrer();
                    break;
                case "Mostrar todas las rutas de bicicleta":
                    _this.mostrarRutasDeBicicleta();
                    break;
                default:
                    console.log("¡Hasta pronto!");
                    break;
            }
        });
    };
    App.prototype.mostrarRutasAlfabeticamente = function () {
        var _this = this;
        console.clear();
        inquirer
            .prompt([
            {
                type: "list",
                name: "rutas",
                message: "¿Como quieres ver la lista de rutas?",
                choices: [
                    "Mostrar todas las rutas por orden alfabético ascendente",
                    "Mostrar todas las rutas por orden alfabético descendente",
                ]
            },
        ])
            .then(function (answers) {
            switch (answers.rutas) {
                case "Mostrar todas las rutas por orden alfabético ascendente":
                    _this.mostrarRutasAlfabeticamenteAscendente();
                    break;
                case "Mostrar todas las rutas por orden alfabético descendente":
                    _this.mostrarRutasAlfabeticamenteDescendente();
                    break;
            }
        });
    };
    App.prototype.mostrarRutasAlfabeticamenteAscendente = function () {
        var _this = this;
        console.clear();
        console.log("Mostrar todas las rutas por orden alfabético ascendente");
        var rutasOrdenadas = [];
        if (this.rutas.length > 0) {
            for (var i = 0; i < this.rutas.length; i++) {
                if (i == 0) {
                    rutasOrdenadas.push(this.rutas[i]);
                }
                else {
                    for (var j = 0; j < rutasOrdenadas.length; j++) {
                        if (this.rutas[i].getNombre() < rutasOrdenadas[j].getNombre()) {
                            rutasOrdenadas.splice(j, 0, this.rutas[i]);
                            break;
                        }
                        else if (j == rutasOrdenadas.length - 1) {
                            rutasOrdenadas.push(this.rutas[i]);
                            break;
                        }
                    }
                }
            }
        }
        for (var i = 0; i < rutasOrdenadas.length; i++) {
            console.log(rutasOrdenadas[i].getNombre());
        }
        console.log("Pulsa enter para volver al menu principal");
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.on("line", function (input) {
            _this.mainMenu();
        });
    };
    App.prototype.mostrarRutasAlfabeticamenteDescendente = function () {
        var _this = this;
        console.clear();
        console.log("Mostrar todas las rutas por orden alfabético descendente");
        var rutasOrdenadas = [];
        if (this.rutas.length > 0) {
            for (var i = 0; i < this.rutas.length; i++) {
                if (i == 0) {
                    rutasOrdenadas.push(this.rutas[i]);
                }
                else {
                    for (var j = 0; j < rutasOrdenadas.length; j++) {
                        if (this.rutas[i].getNombre() > rutasOrdenadas[j].getNombre()) {
                            rutasOrdenadas.splice(j, 0, this.rutas[i]);
                            break;
                        }
                        else if (j == rutasOrdenadas.length - 1) {
                            rutasOrdenadas.push(this.rutas[i]);
                            break;
                        }
                    }
                }
            }
        }
        for (var i = 0; i < rutasOrdenadas.length; i++) {
            console.log(rutasOrdenadas[i].getNombre());
        }
        console.log("Pulsa enter para volver al menu principal");
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.on("line", function (input) {
            _this.mainMenu();
        });
    };
    App.prototype.mostrarRutasPorCantidadDeUsuarios = function () {
        var _this = this;
        console.clear();
        inquirer
            .prompt([
            {
                type: "list",
                name: "rutas",
                message: "¿Como quieres ver la lista de rutas?",
                choices: [
                    "Mostrar todas las rutas por cantidad de usuarios ascendente",
                    "Mostrar todas las rutas por cantidad de usuarios descendente",
                ]
            },
        ])
            .then(function (answers) {
            switch (answers.rutas) {
                case "Mostrar todas las rutas por cantidad de usuarios ascendente":
                    _this.mostrarRutasPorCantidadDeUsuariosAscendente();
                    break;
                case "Mostrar todas las rutas por cantidad de usuarios descendente":
                    _this.mostrarRutasPorCantidadDeUsuariosDescendente();
                    break;
            }
        });
    };
    App.prototype.mostrarRutasPorCantidadDeUsuariosAscendente = function () {
        var _this = this;
        console.clear();
        console.log("Mostrar todas las rutas por cantidad de usuarios ascendente");
        var rutasOrdenadas = [];
        if (this.rutas.length > 0) {
            for (var i = 0; i < this.rutas.length; i++) {
                if (i == 0) {
                    rutasOrdenadas.push(this.rutas[i]);
                }
                else {
                    for (var j = 0; j < rutasOrdenadas.length; j++) {
                        if (this.rutas[i].getUsuarios().length <
                            rutasOrdenadas[j].getUsuarios().length) {
                            rutasOrdenadas.splice(j, 0, this.rutas[i]);
                            break;
                        }
                        else if (j == rutasOrdenadas.length - 1) {
                            rutasOrdenadas.push(this.rutas[i]);
                            break;
                        }
                    }
                }
            }
        }
        for (var i = 0; i < rutasOrdenadas.length; i++) {
            console.log(rutasOrdenadas[i].getNombre());
        }
        console.log("Pulsa enter para volver al menu principal");
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.on("line", function (input) {
            _this.mainMenu();
        });
    };
    App.prototype.mostrarRutasPorCantidadDeUsuariosDescendente = function () {
        var _this = this;
        console.clear();
        console.log("Mostrar todas las rutas por cantidad de usuarios descendente");
        var rutasOrdenadas = [];
        if (this.rutas.length > 0) {
            for (var i = 0; i < this.rutas.length; i++) {
                if (i == 0) {
                    rutasOrdenadas.push(this.rutas[i]);
                }
                else {
                    for (var j = 0; j < rutasOrdenadas.length; j++) {
                        if (this.rutas[i].getUsuarios().length >
                            rutasOrdenadas[j].getUsuarios().length) {
                            rutasOrdenadas.splice(j, 0, this.rutas[i]);
                            break;
                        }
                        else if (j == rutasOrdenadas.length - 1) {
                            rutasOrdenadas.push(this.rutas[i]);
                            break;
                        }
                    }
                }
            }
        }
        for (var i = 0; i < rutasOrdenadas.length; i++) {
            console.log(rutasOrdenadas[i].getNombre());
        }
        console.log("Pulsa enter para volver al menu principal");
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.on("line", function (input) {
            _this.mainMenu();
        });
    };
    App.prototype.mostrarRutasPorDistancia = function () {
        var _this = this;
        console.clear();
        inquirer
            .prompt([
            {
                type: "list",
                name: "rutas",
                message: "¿Como quieres ver la lista de rutas?",
                choices: [
                    "Mostrar todas las rutas por distancia ascendente",
                    "Mostrar todas las rutas por distancia descendente",
                ]
            },
        ])
            .then(function (answers) {
            switch (answers.rutas) {
                case "Mostrar todas las rutas por distancia ascendente":
                    _this.mostrarRutasPorDistanciaAscendente();
                    break;
                case "Mostrar todas las rutas por distancia descendente":
                    _this.mostrarRutasPorDistanciaDescendente();
                    break;
            }
        });
    };
    App.prototype.mostrarRutasPorDistanciaAscendente = function () {
        var _this = this;
        console.clear();
        console.log("Mostrar todas las rutas por distancia ascendente");
        var rutasOrdenadas = [];
        if (this.rutas.length > 0) {
            for (var i = 0; i < this.rutas.length; i++) {
                if (i == 0) {
                    rutasOrdenadas.push(this.rutas[i]);
                }
                else {
                    for (var j = 0; j < rutasOrdenadas.length; j++) {
                        if (this.rutas[i].getDistancia() < rutasOrdenadas[j].getDistancia()) {
                            rutasOrdenadas.splice(j, 0, this.rutas[i]);
                            break;
                        }
                        else if (j == rutasOrdenadas.length - 1) {
                            rutasOrdenadas.push(this.rutas[i]);
                            break;
                        }
                    }
                }
            }
        }
        for (var i = 0; i < rutasOrdenadas.length; i++) {
            console.log(rutasOrdenadas[i].getNombre());
        }
        console.log("Pulsa enter para volver al menu principal");
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.on("line", function (input) {
            _this.mainMenu();
        });
    };
    App.prototype.mostrarRutasPorDistanciaDescendente = function () {
        var _this = this;
        console.clear();
        console.log("Mostrar todas las rutas por distancia descendente");
        var rutasOrdenadas = [];
        if (this.rutas.length > 0) {
            for (var i = 0; i < this.rutas.length; i++) {
                if (i == 0) {
                    rutasOrdenadas.push(this.rutas[i]);
                }
                else {
                    for (var j = 0; j < rutasOrdenadas.length; j++) {
                        if (this.rutas[i].getDistancia() > rutasOrdenadas[j].getDistancia()) {
                            rutasOrdenadas.splice(j, 0, this.rutas[i]);
                            break;
                        }
                        else if (j == rutasOrdenadas.length - 1) {
                            rutasOrdenadas.push(this.rutas[i]);
                            break;
                        }
                    }
                }
            }
        }
        for (var i = 0; i < rutasOrdenadas.length; i++) {
            console.log(rutasOrdenadas[i].getNombre());
        }
        console.log("Pulsa enter para volver al menu principal");
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.on("line", function (input) {
            _this.mainMenu();
        });
    };
    App.prototype.mostrarRutasPorCalificacionMedia = function () {
        var _this = this;
        console.clear();
        inquirer
            .prompt([
            {
                type: "list",
                name: "rutas",
                message: "¿Como quieres ver la lista de rutas?",
                choices: [
                    "Mostrar todas las rutas por calificacion media ascendente",
                    "Mostrar todas las rutas por calificacion media descendente",
                ]
            },
        ])
            .then(function (answers) {
            switch (answers.rutas) {
                case "Mostrar todas las rutas por calificacion media ascendente":
                    _this.mostrarRutasPorCalificacionMediaAscendente();
                    break;
                case "Mostrar todas las rutas por calificacion media descendente":
                    _this.mostrarRutasPorCalificacionMediaDescendente();
                    break;
            }
        });
    };
    App.prototype.mostrarRutasPorCalificacionMediaAscendente = function () {
        var _this = this;
        console.clear();
        console.log("Mostrar todas las rutas por calificacion media ascendente");
        var rutasOrdenadas = [];
        if (this.rutas.length > 0) {
            for (var i = 0; i < this.rutas.length; i++) {
                if (i == 0) {
                    rutasOrdenadas.push(this.rutas[i]);
                }
                else {
                    for (var j = 0; j < rutasOrdenadas.length; j++) {
                        if (this.rutas[i].getCalificacionMedia() <
                            rutasOrdenadas[j].getCalificacionMedia()) {
                            rutasOrdenadas.splice(j, 0, this.rutas[i]);
                            break;
                        }
                        else if (j == rutasOrdenadas.length - 1) {
                            rutasOrdenadas.push(this.rutas[i]);
                            break;
                        }
                    }
                }
            }
        }
        for (var i = 0; i < rutasOrdenadas.length; i++) {
            console.log(rutasOrdenadas[i].getNombre());
        }
        console.log("Pulsa enter para volver al menu principal");
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.on("line", function (input) {
            _this.mainMenu();
        });
    };
    App.prototype.mostrarRutasPorCalificacionMediaDescendente = function () {
        var _this = this;
        console.clear();
        console.log("Mostrar todas las rutas por calificacion media descendente");
        var rutasOrdenadas = [];
        if (this.rutas.length > 0) {
            for (var i = 0; i < this.rutas.length; i++) {
                if (i == 0) {
                    rutasOrdenadas.push(this.rutas[i]);
                }
                else {
                    for (var j = 0; j < rutasOrdenadas.length; j++) {
                        if (this.rutas[i].getCalificacionMedia() >
                            rutasOrdenadas[j].getCalificacionMedia()) {
                            rutasOrdenadas.splice(j, 0, this.rutas[i]);
                            break;
                        }
                        else if (j == rutasOrdenadas.length - 1) {
                            rutasOrdenadas.push(this.rutas[i]);
                            break;
                        }
                    }
                }
            }
        }
        for (var i = 0; i < rutasOrdenadas.length; i++) {
            console.log(rutasOrdenadas[i].getNombre());
        }
        console.log("Pulsa enter para volver al menu principal");
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.on("line", function (input) {
            _this.mainMenu();
        });
    };
    App.prototype.mostrarRutasDeCorrer = function () {
        var _this = this;
        console.clear();
        console.log("Mostrar todas las rutas de correr");
        var rutasDeCorrer = [];
        for (var i = 0; i < this.rutas.length; i++) {
            if (this.rutas[i].getTipoRuta() == "correr") {
                rutasDeCorrer.push(this.rutas[i]);
            }
        }
        for (var i = 0; i < rutasDeCorrer.length; i++) {
            console.log(rutasDeCorrer[i].getNombre());
        }
        console.log("Pulsa enter para volver al menu principal");
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.on("line", function (input) {
            _this.mainMenu();
        });
    };
    App.prototype.mostrarRutasDeBicicleta = function () {
        var _this = this;
        console.clear();
        console.log("Mostrar todas las rutas de bicicleta");
        var rutasDeBicicleta = [];
        for (var i = 0; i < this.rutas.length; i++) {
            if (this.rutas[i].getTipoRuta() == "bicicleta") {
                rutasDeBicicleta.push(this.rutas[i]);
            }
        }
        for (var i = 0; i < rutasDeBicicleta.length; i++) {
            console.log(rutasDeBicicleta[i].getNombre());
        }
        console.log("Pulsa enter para volver al menu principal");
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.on("line", function (input) {
            _this.mainMenu();
        });
    };
    return App;
}());
exports.App = App;
var Ruta1 = new rutas_1.Ruta("Ruta1", [0, 0], [1, 1], 1, 12, [123], "bicicleta", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
var Ruta2 = new rutas_1.Ruta("Ruta2", [0, 0], [1, 1], 1, 12, [123], "bicicleta", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
var Ruta3 = new rutas_1.Ruta("Ruta3", [0, 0], [1, 1], 1, 12, [123], "bicicleta", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
var Ruta4 = new rutas_1.Ruta("Ruta4", [0, 0], [1, 1], 1, 12, [123], "bicicleta", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
var Ruta5 = new rutas_1.Ruta("Ruta5", [0, 0], [1, 1], 1, 12, [123], "bicicleta", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
var Ruta6 = new rutas_1.Ruta("Ruta6", [0, 0], [1, 1], 1, 12, [123], "bicicleta", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
var Ruta7 = new rutas_1.Ruta("Ruta7", [0, 0], [1, 1], 1, 12, [123], "bicicleta", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
var Ruta8 = new rutas_1.Ruta("Ruta8", [0, 0], [1, 1], 1, 12, [123], "bicicleta", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
var Ruta9 = new rutas_1.Ruta("Ruta9", [0, 0], [1, 1], 1, 12, [123], "bicicleta", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
var Ruta10 = new rutas_1.Ruta("Ruta10", [0, 0], [1, 1], 1, 12, [123], "bicicleta", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
var Reto1 = new retos_1.Reto("Reto1", [123], "bicicleta", 200, [1, 2, 3, 4, 6]);
var Reto2 = new retos_1.Reto("Reto2", [123], "bicicleta", 200, [1, 2, 3, 4, 6]);
var Reto3 = new retos_1.Reto("Reto3", [123], "bicicleta", 200, [1, 2, 3, 4, 6]);
var app = new App();
app.setRutas([
    Ruta1,
    Ruta2,
    Ruta3,
    Ruta4,
    Ruta5,
    Ruta6,
    Ruta7,
    Ruta8,
    Ruta9,
    Ruta10,
]);
app.setRetos([Reto1, Reto2, Reto3]);
app.start();
// const jsonadapters = new JsonUsuario();
// jsonadapters.addElement(new Usuario("Pepe"));
