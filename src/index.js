"use strict";
exports.__esModule = true;
exports.App = void 0;
var usuarios_1 = require("./datatypes/usuarios");
var rutas_1 = require("./datatypes/rutas");
var retos_1 = require("./datatypes/retos");
var stats_1 = require("./datatypes/stats");
var grupos_1 = require("./datatypes/grupos");
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
                    break;
                case "Mostrar todas las rutas por distancia":
                    break;
                case "Mostrar todas las rutas por calificacion media":
                    break;
                case "Mostrar todas las rutas de correr":
                    break;
                case "Mostrar todas las rutas de bicicleta":
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
    return App;
}());
exports.App = App;
var Usuario1 = new usuarios_1.Usuario("Pepe");
var Usuario2 = new usuarios_1.Usuario("Juan");
var Usuario3 = new usuarios_1.Usuario("Maria");
var Usuario4 = new usuarios_1.Usuario("Luis");
var Usuario5 = new usuarios_1.Usuario("Ana");
var Usuario6 = new usuarios_1.Usuario("Jose");
var Usuario7 = new usuarios_1.Usuario("Luisa");
var Usuario8 = new usuarios_1.Usuario("Pedro");
var Usuario9 = new usuarios_1.Usuario("Antonio");
var Usuario10 = new usuarios_1.Usuario("Marta");
var Usuario11 = new usuarios_1.Usuario("Rosa");
var Usuario12 = new usuarios_1.Usuario("Lorena");
var Usuario13 = new usuarios_1.Usuario("Sara");
var Usuario14 = new usuarios_1.Usuario("Laura");
var Usuario15 = new usuarios_1.Usuario("Pablo");
var Usuario16 = new usuarios_1.Usuario("Carlos");
var Usuario17 = new usuarios_1.Usuario("Miguel");
var Usuario18 = new usuarios_1.Usuario("Sergio");
var Usuario19 = new usuarios_1.Usuario("Javier");
var Usuario20 = new usuarios_1.Usuario("Raul");
var Ruta1 = new rutas_1.Ruta("Ruta1");
var Ruta2 = new rutas_1.Ruta("Ruta2");
var Ruta3 = new rutas_1.Ruta("Ruta3");
var Ruta4 = new rutas_1.Ruta("Ruta4");
var Ruta5 = new rutas_1.Ruta("Ruta5");
var Ruta6 = new rutas_1.Ruta("Ruta6");
var Ruta7 = new rutas_1.Ruta("Ruta7");
var Ruta8 = new rutas_1.Ruta("Ruta8");
var Ruta9 = new rutas_1.Ruta("Ruta9");
var Ruta10 = new rutas_1.Ruta("Ruta10");
var Reto1 = new retos_1.Reto("Reto1");
var Reto2 = new retos_1.Reto("Reto2");
var Reto3 = new retos_1.Reto("Reto3");
var Grupo1 = new grupos_1.Grupo("Grupo1");
var Grupo2 = new grupos_1.Grupo("Grupo2");
var Grupo3 = new grupos_1.Grupo("Grupo3");
var Grupo4 = new grupos_1.Grupo("Grupo4");
var Grupo5 = new grupos_1.Grupo("Grupo5");
var app = new App();
app.setUsuarios([
    Usuario1,
    Usuario2,
    Usuario3,
    Usuario4,
    Usuario5,
    Usuario6,
    Usuario7,
    Usuario8,
    Usuario9,
    Usuario10,
    Usuario11,
    Usuario12,
    Usuario13,
    Usuario14,
    Usuario15,
    Usuario16,
    Usuario17,
    Usuario18,
    Usuario19,
    Usuario20,
]);
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
app.setGrupos([Grupo1, Grupo2, Grupo3, Grupo4, Grupo5]);
app.mainMenu();
// const jsonadapters = new JsonUsuario();
// jsonadapters.addElement(new Usuario("Pepe"));
