"use strict";
exports.__esModule = true;
exports.App = void 0;
var usuarios_1 = require("./datatypes/usuarios");
//import { Reto } from "./datatypes/retos";
var stats_1 = require("./datatypes/stats");
// import { JsonUsuario } from "./jsonadapters/jsonusuarios";
var readline_1 = require("readline");
var inquirer_1 = require("inquirer");
var jsonusuarios_1 = require("./jsonadapters/jsonusuarios");
var jsongrupos_1 = require("./jsonadapters/jsongrupos");
var jsonrutas_1 = require("./jsonadapters/jsonrutas");
var jsonretos_1 = require("./jsonadapters/jsonretos");
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
        this.usuarios = new jsonusuarios_1.JsonUsuarios();
        this.rutas = new jsonrutas_1.JsonRutas();
        this.retos = new jsonretos_1.JsonRetos();
        this.grupos = new jsongrupos_1.JsonGrupos();
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
    App.prototype.start = function () {
        var _this = this;
        console.log("Bienvenido a DeStravaTe");
        inquirer_1["default"]
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
        inquirer_1["default"]
            .prompt([
            {
                type: "input",
                name: "username",
                message: "Introduce tu nombre de usuario"
            },
        ])
            .then(function (answers) {
            var username = answers["username"];
            var user = _this.usuarios.findElement(username);
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
        inquirer_1["default"]
            .prompt([
            {
                type: "input",
                name: "username",
                message: "Introduce tu nombre de usuario"
            },
        ])
            .then(function (answers) {
            var username = answers["username"];
            var user = _this.usuarios.findElement(username);
            if (user !== undefined) {
                console.log("Usuario ya existente");
                _this.register();
            }
            else {
                _this.usuarios.addElement(new usuarios_1.Usuario(username, undefined, [], new stats_1.Stats(), [], [], []));
                _this.mainMenu();
            }
        });
    };
    App.prototype.mainMenu = function () {
        var _this = this;
        console.clear();
        inquirer_1["default"]
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
                    _this.mostrarUsuarios();
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
                    console.clear();
                    break;
            }
        });
        console.log("Pulsa enter para volver al menu principal");
        var rl = readline_1["default"].createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.on("line", function () {
            _this.mainMenu();
        });
    };
    App.prototype.mostrarRutas = function () {
        var _this = this;
        console.clear();
        inquirer_1["default"]
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
        inquirer_1["default"]
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
        console.clear();
        console.log("Mostrar todas las rutas por orden alfabético ascendente");
        var rutasOrdenadas = [];
        if (this.rutas.length() > 0) {
            this.rutas.forEach(function (ruta) {
                if (rutasOrdenadas.length == 0) {
                    rutasOrdenadas.push(ruta);
                }
                else {
                    for (var i = 0; i < rutasOrdenadas.length; i++) {
                        if (ruta.getNombre() < rutasOrdenadas[i].getNombre()) {
                            rutasOrdenadas.splice(i, 0, ruta);
                            break;
                        }
                        else if (i == rutasOrdenadas.length - 1) {
                            rutasOrdenadas.push(ruta);
                            break;
                        }
                    }
                }
            });
        }
        for (var i = 0; i < rutasOrdenadas.length; i++) {
            console.log(rutasOrdenadas[i].getNombre());
        }
    };
    App.prototype.mostrarRutasAlfabeticamenteDescendente = function () {
        console.clear();
        console.log("Mostrar todas las rutas por orden alfabético descendente");
        var rutasOrdenadas = [];
        if (this.rutas.length() > 0) {
            this.rutas.forEach(function (ruta) {
                if (rutasOrdenadas.length == 0) {
                    rutasOrdenadas.push(ruta);
                }
                else {
                    for (var i = 0; i < rutasOrdenadas.length; i++) {
                        if (ruta.getNombre() > rutasOrdenadas[i].getNombre()) {
                            rutasOrdenadas.splice(i, 0, ruta);
                            break;
                        }
                        else if (i == rutasOrdenadas.length - 1) {
                            rutasOrdenadas.push(ruta);
                            break;
                        }
                    }
                }
            });
        }
        for (var i = 0; i < rutasOrdenadas.length; i++) {
            console.log(rutasOrdenadas[i].getNombre());
        }
    };
    App.prototype.mostrarRutasPorCantidadDeUsuarios = function () {
        var _this = this;
        console.clear();
        inquirer_1["default"]
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
        console.clear();
        console.log("Mostrar todas las rutas por cantidad de usuarios ascendente");
        var rutasOrdenadas = [];
        if (this.rutas.length() > 0) {
            this.rutas.forEach(function (ruta) {
                if (rutasOrdenadas.length == 0) {
                    rutasOrdenadas.push(ruta);
                }
                else {
                    for (var i = 0; i < rutasOrdenadas.length; i++) {
                        if (ruta.getUsuarios().length < rutasOrdenadas[i].getUsuarios().length) {
                            rutasOrdenadas.splice(i, 0, ruta);
                            break;
                        }
                        else if (i == rutasOrdenadas.length - 1) {
                            rutasOrdenadas.push(ruta);
                            break;
                        }
                    }
                }
            });
        }
        for (var i = 0; i < rutasOrdenadas.length; i++) {
            console.log(rutasOrdenadas[i].getNombre());
        }
    };
    App.prototype.mostrarRutasPorCantidadDeUsuariosDescendente = function () {
        console.clear();
        console.log("Mostrar todas las rutas por cantidad de usuarios descendente");
        var rutasOrdenadas = [];
        if (this.rutas.length() > 0) {
            this.rutas.forEach(function (ruta) {
                if (rutasOrdenadas.length == 0) {
                    rutasOrdenadas.push(ruta);
                }
                else {
                    for (var i = 0; i < rutasOrdenadas.length; i++) {
                        if (ruta.getUsuarios().length > rutasOrdenadas[i].getUsuarios().length) {
                            rutasOrdenadas.splice(i, 0, ruta);
                            break;
                        }
                        else if (i == rutasOrdenadas.length - 1) {
                            rutasOrdenadas.push(ruta);
                            break;
                        }
                    }
                }
            });
        }
        for (var i = 0; i < rutasOrdenadas.length; i++) {
            console.log(rutasOrdenadas[i].getNombre());
        }
    };
    App.prototype.mostrarRutasPorDistancia = function () {
        var _this = this;
        console.clear();
        inquirer_1["default"]
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
        console.clear();
        console.log("Mostrar todas las rutas por distancia ascendente");
        var rutasOrdenadas = [];
        if (this.rutas.length() > 0) {
            this.rutas.forEach(function (ruta) {
                if (rutasOrdenadas.length == 0) {
                    rutasOrdenadas.push(ruta);
                }
                else {
                    for (var i = 0; i < rutasOrdenadas.length; i++) {
                        if (ruta.getDistancia() < rutasOrdenadas[i].getDistancia()) {
                            rutasOrdenadas.splice(i, 0, ruta);
                            break;
                        }
                        else if (i == rutasOrdenadas.length - 1) {
                            rutasOrdenadas.push(ruta);
                            break;
                        }
                    }
                }
            });
        }
        for (var i = 0; i < rutasOrdenadas.length; i++) {
            console.log(rutasOrdenadas[i].getNombre());
        }
    };
    App.prototype.mostrarRutasPorDistanciaDescendente = function () {
        console.clear();
        console.log("Mostrar todas las rutas por distancia descendente");
        var rutasOrdenadas = [];
        if (this.rutas.length() > 0) {
            this.rutas.forEach(function (ruta) {
                if (rutasOrdenadas.length == 0) {
                    rutasOrdenadas.push(ruta);
                }
                else {
                    for (var i = 0; i < rutasOrdenadas.length; i++) {
                        if (ruta.getDistancia() > rutasOrdenadas[i].getDistancia()) {
                            rutasOrdenadas.splice(i, 0, ruta);
                            break;
                        }
                        else if (i == rutasOrdenadas.length - 1) {
                            rutasOrdenadas.push(ruta);
                            break;
                        }
                    }
                }
            });
        }
        for (var i = 0; i < rutasOrdenadas.length; i++) {
            console.log(rutasOrdenadas[i].getNombre());
        }
    };
    App.prototype.mostrarRutasPorCalificacionMedia = function () {
        var _this = this;
        console.clear();
        inquirer_1["default"]
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
        console.clear();
        console.log("Mostrar todas las rutas por calificacion media ascendente");
        var rutasOrdenadas = [];
        if (this.rutas.length() > 0) {
            this.rutas.forEach(function (ruta) {
                if (rutasOrdenadas.length == 0) {
                    rutasOrdenadas.push(ruta);
                }
                else {
                    for (var i = 0; i < rutasOrdenadas.length; i++) {
                        if (ruta.getCalificacionMedia() <
                            rutasOrdenadas[i].getCalificacionMedia()) {
                            rutasOrdenadas.splice(i, 0, ruta);
                            break;
                        }
                        else if (i == rutasOrdenadas.length - 1) {
                            rutasOrdenadas.push(ruta);
                            break;
                        }
                    }
                }
            });
        }
        for (var i = 0; i < rutasOrdenadas.length; i++) {
            console.log(rutasOrdenadas[i].getNombre());
        }
    };
    App.prototype.mostrarRutasPorCalificacionMediaDescendente = function () {
        console.clear();
        console.log("Mostrar todas las rutas por calificacion media descendente");
        var rutasOrdenadas = [];
        if (this.rutas.length() > 0) {
            this.rutas.forEach(function (ruta) {
                if (rutasOrdenadas.length == 0) {
                    rutasOrdenadas.push(ruta);
                }
                else {
                    for (var i = 0; i < rutasOrdenadas.length; i++) {
                        if (ruta.getCalificacionMedia() >
                            rutasOrdenadas[i].getCalificacionMedia()) {
                            rutasOrdenadas.splice(i, 0, ruta);
                            break;
                        }
                        else if (i == rutasOrdenadas.length - 1) {
                            rutasOrdenadas.push(ruta);
                            break;
                        }
                    }
                }
            });
        }
        for (var i = 0; i < rutasOrdenadas.length; i++) {
            console.log(rutasOrdenadas[i].getNombre());
        }
    };
    App.prototype.mostrarRutasDeCorrer = function () {
        console.clear();
        console.log("Mostrar todas las rutas de correr");
        var rutasDeCorrer = [];
        this.rutas.forEach(function (ruta) {
            if (ruta.getTipoRuta() == "correr") {
                rutasDeCorrer.push(ruta);
            }
        });
        for (var i = 0; i < rutasDeCorrer.length; i++) {
            console.log(rutasDeCorrer[i].getNombre());
        }
    };
    App.prototype.mostrarRutasDeBicicleta = function () {
        console.clear();
        console.log("Mostrar todas las rutas de bicicleta");
        var rutasDeBicicleta = [];
        this.rutas.forEach(function (ruta) {
            if (ruta.getTipoRuta() == "bicicleta") {
                rutasDeBicicleta.push(ruta);
            }
        });
        for (var i = 0; i < rutasDeBicicleta.length; i++) {
            console.log(rutasDeBicicleta[i].getNombre());
        }
    };
    App.prototype.mostrarUsuarios = function () {
        var _this = this;
        console.clear();
        inquirer_1["default"]
            .prompt([
            {
                type: "list",
                name: "usuarios",
                message: "¿Como quieres ver la lista de usuarios?",
                choices: [
                    "Mostrar todos los usuarios alfabeticamente",
                    "Mostrar todos los usuarios por numero de km recorridos",
                ]
            },
        ])
            .then(function (answers) {
            switch (answers.usuarios) {
                case "Mostrar todos los usuarios alfabeticamente":
                    _this.mostrarUsuariosAlfabeticamente();
                    break;
                case "Mostrar todos los usuarios por numero de km recorridos":
                    _this.mostrarUsuariosPorKmRecorridos();
                    break;
            }
        });
    };
    App.prototype.mostrarUsuariosAlfabeticamente = function () {
        var _this = this;
        console.clear();
        inquirer_1["default"]
            .prompt([
            {
                type: "list",
                name: "usuarios",
                message: "¿Como quieres ver la lista de usuarios?",
                choices: [
                    "Mostrar todos los usuarios alfabeticamente ascendente",
                    "Mostrar todos los usuarios alfabeticamente descendente",
                ]
            },
        ])
            .then(function (answers) {
            switch (answers.usuarios) {
                case "Mostrar todos los usuarios alfabeticamente ascendente":
                    _this.mostrarUsuariosAlfabeticamenteAscendente();
                    break;
                case "Mostrar todos los usuarios alfabeticamente descendente":
                    _this.mostrarUsuariosAlfabeticamenteDescendente();
                    break;
            }
        });
    };
    App.prototype.mostrarUsuariosAlfabeticamenteAscendente = function () {
        console.clear();
        console.log("Mostrar todos los usuarios alfabeticamente ascendente");
        var usuariosOrdenados = [];
        if (this.usuarios.length() > 0) {
            this.usuarios.forEach(function (usuario) {
                if (usuariosOrdenados.length == 0) {
                    usuariosOrdenados.push(usuario);
                }
                else {
                    for (var i = 0; i < usuariosOrdenados.length; i++) {
                        if (usuario.getNombre() < usuariosOrdenados[i].getNombre()) {
                            usuariosOrdenados.splice(i, 0, usuario);
                            break;
                        }
                        else if (i == usuariosOrdenados.length - 1) {
                            usuariosOrdenados.push(usuario);
                            break;
                        }
                    }
                }
            });
        }
        for (var i = 0; i < usuariosOrdenados.length; i++) {
            console.log(usuariosOrdenados[i].getNombre());
        }
    };
    App.prototype.mostrarUsuariosAlfabeticamenteDescendente = function () {
        console.clear();
        console.log("Mostrar todos los usuarios alfabeticamente descendente");
        var usuariosOrdenados = [];
        if (this.usuarios.length() > 0) {
            this.usuarios.forEach(function (usuario) {
                if (usuariosOrdenados.length == 0) {
                    usuariosOrdenados.push(usuario);
                }
                else {
                    for (var i = 0; i < usuariosOrdenados.length; i++) {
                        if (usuario.getNombre() > usuariosOrdenados[i].getNombre()) {
                            usuariosOrdenados.splice(i, 0, usuario);
                            break;
                        }
                        else if (i == usuariosOrdenados.length - 1) {
                            usuariosOrdenados.push(usuario);
                            break;
                        }
                    }
                }
            });
        }
        for (var i = 0; i < usuariosOrdenados.length; i++) {
            console.log(usuariosOrdenados[i].getNombre());
        }
    };
    App.prototype.mostrarUsuariosPorKmRecorridos = function () { };
    return App;
}());
exports.App = App;
