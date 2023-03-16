import { Usuario } from "./datatypes/usuarios";
import { Ruta } from "./datatypes/rutas";
import { Reto } from "./datatypes/retos";
import { Stats } from "./datatypes/stats";
import { Grupo } from "./datatypes/grupos";

import { JsonUsuario } from "./jsonadapters/jsonusuarios";

import inquirer from "inquirer";

export class App {
  private usuarios: Usuario[];
  private rutas: Ruta[];
  private retos: Reto[];
  private grupos: Grupo[];
  private stats: Stats;

  constructor() {
    this.usuarios = [];
    this.rutas = [];
    this.retos = [];
    this.grupos = [];
    this.stats = new Stats();
  }

  public mainMeny():void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "mainMenu",
          message: "¿Qué quieres hacer?",
          choices: [
            "Crear un usuario",
            "Crear una ruta",
            "Crear un reto",
            "Crear un grupo",
            "Salir",
          ],
        },
      ])
      .then((answers) => {
        switch (answers.mainMenu) {
          case "Crear un usuario":
            break;
          case "Crear una ruta":
            break;
          case "Crear un reto":
            break;
          case "Crear un grupo":
            break;
          case "Salir":
            console.log("¡Hasta pronto!");
            break;
        }
      });
    
  }
}

const jsonadapters = new JsonUsuario();
jsonadapters.addElement(new Usuario("Pepe"));
