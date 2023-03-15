import { Usuario } from "./usuarios";
import { Ruta } from "./rutas";
import { Reto } from "./retos";
import { Stats } from "./stats";
import { Grupo } from "./grupos";

import * as inquirer from "inquirer";
import * as fs from "fs";


function promptUsuario() {
inquirer.promt({
    type: "list",
    name: "option",
    message: "¿Qué quieres hacer?",
    choices: [
      "Crear usuario",
      "Crear grupo",
      "Crear ruta",
      "Crear reto",
      "Salir",
    ],
  }).then((answers) => {
    switch (answers.option) {
      case "Crear usuario":
        break;
      case "Crear grupo":
        break;
      case "Crear ruta":
        break;
      case "Crear reto":
        break;
      case "Salir":
        console.log("¡Hasta pronto!");
        break;
    }
  });
}