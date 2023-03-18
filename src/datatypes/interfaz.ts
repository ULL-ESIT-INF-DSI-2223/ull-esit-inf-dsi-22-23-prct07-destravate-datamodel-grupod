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

  public start(): void {
    console.log("Bienvenido a DeStravaTe");
    inquirer
      .prompt([
        {
          type: "list",
          name: "command",
          message: "¿Que quieres hacer?",
          choices: ["Iniciar sesión", "Registrarse"],
        },
      ])
      .then((answers: any) => {
        if (answers["command"] === "Iniciar sesión") {
          this.login();
        } else {
          this.register();
        }
      });
  }

  public login(): void {
    console.clear();
    inquirer
      .prompt([
        {
          type: "input",
          name: "username",
          message: "Introduce tu nombre de usuario",
        },
      ])
      .then((answers: any) => {
        let username = answers["username"];
        let user = this.usuarios.find((u) => u.getNombre() === username);
        if (user !== undefined) {
          this.mainMenu();
        } else {
          console.log("Usuario no encontrado");
          this.login();
        }
      });
  }

  public register(): void {
    console.clear();
    inquirer
      .prompt([
        {
          type: "input",
          name: "username",
          message: "Introduce tu nombre de usuario",
        },
      ])
      .then((answers: any) => {
        let username = answers["username"];
        let user = this.usuarios.find((u) => u.getNombre() === username);
        if (user !== undefined) {
          console.log("Usuario ya existente");
          this.register();
        } else {
          this.usuarios.push(
            new Usuario(username, undefined, [], new Stats(), [], [], [])
          );
          this.mainMenu();
        }
      });
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
            this.mostrarRutasPorCantidadDeUsuarios();
            break;

          case "Mostrar todas las rutas por distancia":
            this.mostrarRutasPorDistancia();
            break;

          case "Mostrar todas las rutas por calificacion media":
            this.mostrarRutasPorCalificacionMedia();
            break;

          case "Mostrar todas las rutas de correr":
            this.mostrarRutasDeCorrer();
            break;

          case "Mostrar todas las rutas de bicicleta":
            this.mostrarRutasDeBicicleta();
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
            this.mostrarRutasAlfabeticamenteDescendente();
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

  public mostrarRutasAlfabeticamenteDescendente(): void {
    console.clear();
    console.log("Mostrar todas las rutas por orden alfabético descendente");
    let rutasOrdenadas: Ruta[] = [];
    if (this.rutas.length > 0) {
      for (let i = 0; i < this.rutas.length; i++) {
        if (i == 0) {
          rutasOrdenadas.push(this.rutas[i]);
        } else {
          for (let j = 0; j < rutasOrdenadas.length; j++) {
            if (this.rutas[i].getNombre() > rutasOrdenadas[j].getNombre()) {
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

  public mostrarRutasPorCantidadDeUsuarios(): void {
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
          ],
        },
      ])
      .then((answers: any) => {
        switch (answers.rutas) {
          case "Mostrar todas las rutas por cantidad de usuarios ascendente":
            this.mostrarRutasPorCantidadDeUsuariosAscendente();
            break;
          case "Mostrar todas las rutas por cantidad de usuarios descendente":
            this.mostrarRutasPorCantidadDeUsuariosDescendente();
            break;
        }
      });
  }

  public mostrarRutasPorCantidadDeUsuariosAscendente(): void {
    console.clear();
    console.log("Mostrar todas las rutas por cantidad de usuarios ascendente");
    let rutasOrdenadas: Ruta[] = [];
    if (this.rutas.length > 0) {
      for (let i = 0; i < this.rutas.length; i++) {
        if (i == 0) {
          rutasOrdenadas.push(this.rutas[i]);
        } else {
          for (let j = 0; j < rutasOrdenadas.length; j++) {
            if (
              this.rutas[i].getUsuarios().length <
              rutasOrdenadas[j].getUsuarios().length
            ) {
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

  public mostrarRutasPorCantidadDeUsuariosDescendente(): void {
    console.clear();
    console.log("Mostrar todas las rutas por cantidad de usuarios descendente");
    let rutasOrdenadas: Ruta[] = [];
    if (this.rutas.length > 0) {
      for (let i = 0; i < this.rutas.length; i++) {
        if (i == 0) {
          rutasOrdenadas.push(this.rutas[i]);
        } else {
          for (let j = 0; j < rutasOrdenadas.length; j++) {
            if (
              this.rutas[i].getUsuarios().length >
              rutasOrdenadas[j].getUsuarios().length
            ) {
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

  public mostrarRutasPorDistancia(): void {
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
          ],
        },
      ])
      .then((answers: any) => {
        switch (answers.rutas) {
          case "Mostrar todas las rutas por distancia ascendente":
            this.mostrarRutasPorDistanciaAscendente();
            break;
          case "Mostrar todas las rutas por distancia descendente":
            this.mostrarRutasPorDistanciaDescendente();
            break;
        }
      });
  }

  public mostrarRutasPorDistanciaAscendente(): void {
    console.clear();
    console.log("Mostrar todas las rutas por distancia ascendente");
    let rutasOrdenadas: Ruta[] = [];
    if (this.rutas.length > 0) {
      for (let i = 0; i < this.rutas.length; i++) {
        if (i == 0) {
          rutasOrdenadas.push(this.rutas[i]);
        } else {
          for (let j = 0; j < rutasOrdenadas.length; j++) {
            if (
              this.rutas[i].getDistancia() < rutasOrdenadas[j].getDistancia()
            ) {
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

  public mostrarRutasPorDistanciaDescendente(): void {
    console.clear();
    console.log("Mostrar todas las rutas por distancia descendente");
    let rutasOrdenadas: Ruta[] = [];
    if (this.rutas.length > 0) {
      for (let i = 0; i < this.rutas.length; i++) {
        if (i == 0) {
          rutasOrdenadas.push(this.rutas[i]);
        } else {
          for (let j = 0; j < rutasOrdenadas.length; j++) {
            if (
              this.rutas[i].getDistancia() > rutasOrdenadas[j].getDistancia()
            ) {
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

  public mostrarRutasPorCalificacionMedia(): void {
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
          ],
        },
      ])
      .then((answers: any) => {
        switch (answers.rutas) {
          case "Mostrar todas las rutas por calificacion media ascendente":
            this.mostrarRutasPorCalificacionMediaAscendente();
            break;
          case "Mostrar todas las rutas por calificacion media descendente":
            this.mostrarRutasPorCalificacionMediaDescendente();
            break;
        }
      });
  }

  public mostrarRutasPorCalificacionMediaAscendente(): void {
    console.clear();
    console.log("Mostrar todas las rutas por calificacion media ascendente");
    let rutasOrdenadas: Ruta[] = [];
    if (this.rutas.length > 0) {
      for (let i = 0; i < this.rutas.length; i++) {
        if (i == 0) {
          rutasOrdenadas.push(this.rutas[i]);
        } else {
          for (let j = 0; j < rutasOrdenadas.length; j++) {
            if (
              this.rutas[i].getCalificacionMedia() <
              rutasOrdenadas[j].getCalificacionMedia()
            ) {
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

  public mostrarRutasPorCalificacionMediaDescendente(): void {
    console.clear();
    console.log("Mostrar todas las rutas por calificacion media descendente");
    let rutasOrdenadas: Ruta[] = [];
    if (this.rutas.length > 0) {
      for (let i = 0; i < this.rutas.length; i++) {
        if (i == 0) {
          rutasOrdenadas.push(this.rutas[i]);
        } else {
          for (let j = 0; j < rutasOrdenadas.length; j++) {
            if (
              this.rutas[i].getCalificacionMedia() >
              rutasOrdenadas[j].getCalificacionMedia()
            ) {
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

  public mostrarRutasDeCorrer(): void {
    console.clear();
    console.log("Mostrar todas las rutas de correr");
    let rutasDeCorrer: Ruta[] = [];
    for (let i = 0; i < this.rutas.length; i++) {
      if (this.rutas[i].getTipoRuta() == "correr") {
        rutasDeCorrer.push(this.rutas[i]);
      }
    }
    for (let i = 0; i < rutasDeCorrer.length; i++) {
      console.log(rutasDeCorrer[i].getNombre());
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

  public mostrarRutasDeBicicleta(): void {
    console.clear();
    console.log("Mostrar todas las rutas de bicicleta");
    let rutasDeBicicleta: Ruta[] = [];
    for (let i = 0; i < this.rutas.length; i++) {
      if (this.rutas[i].getTipoRuta() == "bicicleta") {
        rutasDeBicicleta.push(this.rutas[i]);
      }
    }
    for (let i = 0; i < rutasDeBicicleta.length; i++) {
      console.log(rutasDeBicicleta[i].getNombre());
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

app.start();

// const jsonadapters = new JsonUsuario();
// jsonadapters.addElement(new Usuario("Pepe"));
