import { Usuario } from "./usuarios";
import { Ruta } from "./rutas";
import { Reto } from "./retos";
import { Stats } from "./stats";
import { Grupo } from "./grupos";

import * as inquirer from "inquirer";

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
    let answer = await inquirer.prompt({
      type: "list",
      name: "option",
      message: "¿Qué quieres hacer?",
      choices: [
        "Gestionar usuarios",
        "Gestionar rutas",
        "Gestionar retos",
        "Gestionar grupos",
        "Gestionar estadísticas",
        "Salir"
      ]
    });
  }

}