import { Usuario } from "./usuarios";
import { Ruta } from "./rutas";
import { Reto } from "./retos";
import { Stats } from "./stats";
import { Grupo } from "./grupos";

// import { JsonUsuario } from "./jsonadapters/jsonusuarios";

import * as readline from "readline";

const inquirer = require("inquirer");

enum Commandos {
  CrearUsuario = "Crear un usuario",
  MostrarUsuarios = "Mostrar usuarios",
  ModificarUsuario = "Modificar un usuario",
  CrearRuta = "Crear una ruta",
  MostrarRutas = "Mostrar rutas",
  ModificarRuta = "Modificar una ruta",
  CrearReto = "Crear un reto",
  MostrarRetos = "Mostrar retos",
  ModificarReto = "Modificar un reto",
  CrearGrupo = "Crear un grupo",
  MostrarGrupos = "Mostrar grupos",
  ModificarGrupo = "Modificar un grupo",

  Salir = "Salir",
}

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

  public setUsuarios(usuarios: Usuario[]): void {
    this.usuarios = usuarios;
  }

  public setRutas(rutas: Ruta[]): void {
    this.rutas = rutas;
  }

  public setRetos(retos: Reto[]): void {
    this.retos = retos;
  }

  public setGrupos(grupos: Grupo[]): void {
    this.grupos = grupos;
  }

  public setStats(stats: Stats): void {
    this.stats = stats;
  }

  public mainMenu(): void {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "command",
          message: "¿Que quieres hacer?",
          choices: Object.values(Commandos),
        },
      ])
      .then((answers: any) => {
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
            this.mostrarRutas();
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
  }

  public mostrarRutas(): void {
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
          ],
        },
      ])
      .then((answers: any) => {
        switch (answers.rutas) {
          case "Mostrar todas las rutas por orden alfabético":
            this.mostrarRutasAlfabeticamente();
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
  }

  public mostrarRutasAlfabeticamente(): void {
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
          ],
        },
      ])
      .then((answers: any) => {
        switch (answers.rutas) {
          case "Mostrar todas las rutas por orden alfabético ascendente":
            this.mostrarRutasAlfabeticamenteAscendente();
            break;
          case "Mostrar todas las rutas por orden alfabético descendente":
            break;
        }
      });
  }

  public mostrarRutasAlfabeticamenteAscendente(): void {
    console.clear();
    console.log("Mostrar todas las rutas por orden alfabético ascendente");
    let rutasOrdenadas: Ruta[] = [];
    if (this.rutas.length > 0) {
      for (let i = 0; i < this.rutas.length; i++) {
        if (i == 0) {
          rutasOrdenadas.push(this.rutas[i]);
        } else {
          for (let j = 0; j < rutasOrdenadas.length; j++) {
            if (this.rutas[i].getNombre() < rutasOrdenadas[j].getNombre()) {
              rutasOrdenadas.splice(j, 0, this.rutas[i]);
              break;
            } else if (j == rutasOrdenadas.length - 1) {
              rutasOrdenadas.push(this.rutas[i]);
              break;
            }
          }
        }
      }
    }
    for (let i = 0; i < rutasOrdenadas.length; i++) {
      console.log(rutasOrdenadas[i].getNombre());
    }
    console.log("Pulsa enter para volver al menu principal");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.on("line", (input) => {
      this.mainMenu();
    });
  }
}

let Ruta1 = new Ruta(
  "Ruta1",
  [0, 0],
  [1, 1],
  1,
  12,
  [123],
  "bicicleta",
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
);
let Ruta2 = new Ruta(
  "Ruta2",
  [0, 0],
  [1, 1],
  1,
  12,
  [123],
  "bicicleta",
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
);
let Ruta3 = new Ruta(
  "Ruta3",
  [0, 0],
  [1, 1],
  1,
  12,
  [123],
  "bicicleta",
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
);
let Ruta4 = new Ruta(
  "Ruta4",
  [0, 0],
  [1, 1],
  1,
  12,
  [123],
  "bicicleta",
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
);
let Ruta5 = new Ruta(
  "Ruta5",
  [0, 0],
  [1, 1],
  1,
  12,
  [123],
  "bicicleta",
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
);
let Ruta6 = new Ruta(
  "Ruta6",
  [0, 0],
  [1, 1],
  1,
  12,
  [123],
  "bicicleta",
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
);
let Ruta7 = new Ruta(
  "Ruta7",
  [0, 0],
  [1, 1],
  1,
  12,
  [123],
  "bicicleta",
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
);
let Ruta8 = new Ruta(
  "Ruta8",
  [0, 0],
  [1, 1],
  1,
  12,
  [123],
  "bicicleta",
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
);
let Ruta9 = new Ruta(
  "Ruta9",
  [0, 0],
  [1, 1],
  1,
  12,
  [123],
  "bicicleta",
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
);
let Ruta10 = new Ruta(
  "Ruta10",
  [0, 0],
  [1, 1],
  1,
  12,
  [123],
  "bicicleta",
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
);

let Reto1 = new Reto("Reto1", [123], "bicicleta", 200, [1, 2, 3, 4, 6]);
let Reto2 = new Reto("Reto2", [123], "bicicleta", 200, [1, 2, 3, 4, 6]);
let Reto3 = new Reto("Reto3", [123], "bicicleta", 200, [1, 2, 3, 4, 6]);

let app = new App();

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

app.mainMenu();

// const jsonadapters = new JsonUsuario();
// jsonadapters.addElement(new Usuario("Pepe"));
