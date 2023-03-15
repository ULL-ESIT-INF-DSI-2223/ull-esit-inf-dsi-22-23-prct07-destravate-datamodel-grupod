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

  public async mainMenu() {
    console.log("Bienvenido a la aplicación de rutas");
    const answer = await inquirer.prompt({
      type: "list",
      name: "option",
      message: "¿Qué quieres hacer?",
      choices: [
        "Gestionar usuarios",
        "Gestionar rutas",
        "Gestionar retos",
        "Gestionar grupos",
        "Gestionar estadísticas",
        "Salir",
      ],
    });
  }
}

const jsonadapters = new JsonUsuario();
jsonadapters.addElement(new Usuario("Pepe"));
