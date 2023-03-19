import { Usuario } from "./datatypes/usuarios";
import { Ruta } from "./datatypes/rutas";
//import { Reto } from "./datatypes/retos";
import { Stats } from "./datatypes/stats";
//import { Grupo } from "./datatypes/grupos";
import { UsuarioCollection } from "./collections/usuario_collection";
import { RutaCollection } from "./collections/rutas_collection";
import { RetoCollection } from "./collections/retos_collection";
import { GrupoCollection } from "./collections/grupos_collection";

import fs from "fs";

// import { JsonUsuario } from "./jsonadapters/jsonusuarios";

import readline from "readline";
import inquirer from "inquirer";

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
  private usuarios: UsuarioCollection;
  private rutas: RutaCollection;
  private retos: RetoCollection;
  private grupos: GrupoCollection;

  constructor() {
    this.usuarios = new UsuarioCollection();
    this.rutas = new RutaCollection();
    this.retos = new RetoCollection();
    this.grupos = new GrupoCollection();
  }

  public setUsuarios(usuarios: UsuarioCollection): void {
    this.usuarios = usuarios;
  }

  public setRutas(rutas: RutaCollection): void {
    this.rutas = rutas;
  }

  public setRetos(retos: RetoCollection): void {
    this.retos = retos;
  }

  public setGrupos(grupos: GrupoCollection): void {
    this.grupos = grupos;
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
      .then((answers) => {
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
      .then((answers) => {
        const username = answers["username"];
        const user = this.usuarios.findElement(username);
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
      .then((answers) => {
        const username = answers["username"];
        const user = this.usuarios.findElement(username);
        if (user !== undefined) {
          console.log("Usuario ya existente");
          this.register();
        } else {
          this.usuarios.addElement(
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
      .then((answers) => {
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
      .then((answers) => {
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
      .then((answers) => {
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
    const rutasOrdenadas: Ruta[] = [];
    if (this.rutas.length() > 0) {
      this.rutas.forEach((ruta) => {
        if (rutasOrdenadas.length == 0) {
          rutasOrdenadas.push(ruta);
        } else {
          for (let i = 0; i < rutasOrdenadas.length; i++) {
            if (ruta.getNombre() < rutasOrdenadas[i].getNombre()) {
              rutasOrdenadas.splice(i, 0, ruta);
              break;
            } else if (i == rutasOrdenadas.length - 1) {
              rutasOrdenadas.push(ruta);
              break;
            }
          }
        }
      });
    }
    for (let i = 0; i < rutasOrdenadas.length; i++) {
      console.log(rutasOrdenadas[i].getNombre());
    }
    console.log("Pulsa enter para volver al menu principal");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.on("line", () => {
      this.mainMenu();
    });
  }

  public mostrarRutasAlfabeticamenteDescendente(): void {
    console.clear();
    console.log("Mostrar todas las rutas por orden alfabético descendente");
    const rutasOrdenadas: Ruta[] = [];
    if (this.rutas.length() > 0) {
      this.rutas.forEach((ruta) => {
        if (rutasOrdenadas.length == 0) {
          rutasOrdenadas.push(ruta);
        } else {
          for (let i = 0; i < rutasOrdenadas.length; i++) {
            if (ruta.getNombre() > rutasOrdenadas[i].getNombre()) {
              rutasOrdenadas.splice(i, 0, ruta);
              break;
            } else if (i == rutasOrdenadas.length - 1) {
              rutasOrdenadas.push(ruta);
              break;
            }
          }
        }
      });
    }
    for (let i = 0; i < rutasOrdenadas.length; i++) {
      console.log(rutasOrdenadas[i].getNombre());
    }
    console.log("Pulsa enter para volver al menu principal");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.on("line", () => {
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
      .then((answers) => {
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
    const rutasOrdenadas: Ruta[] = [];
    if (this.rutas.length() > 0) {
      this.rutas.forEach((ruta) => {
        if (rutasOrdenadas.length == 0) {
          rutasOrdenadas.push(ruta);
        } else {
          for (let i = 0; i < rutasOrdenadas.length; i++) {
            if (
              ruta.getUsuarios().length < rutasOrdenadas[i].getUsuarios().length
            ) {
              rutasOrdenadas.splice(i, 0, ruta);
              break;
            } else if (i == rutasOrdenadas.length - 1) {
              rutasOrdenadas.push(ruta);
              break;
            }
          }
        }
      });
    }
    for (let i = 0; i < rutasOrdenadas.length; i++) {
      console.log(rutasOrdenadas[i].getNombre());
    }
    console.log("Pulsa enter para volver al menu principal");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.on("line", () => {
      this.mainMenu();
    });
  }

  public mostrarRutasPorCantidadDeUsuariosDescendente(): void {
    console.clear();
    console.log("Mostrar todas las rutas por cantidad de usuarios descendente");
    const rutasOrdenadas: Ruta[] = [];
    if (this.rutas.length() > 0) {
      this.rutas.forEach((ruta) => {
        if (rutasOrdenadas.length == 0) {
          rutasOrdenadas.push(ruta);
        } else {
          for (let i = 0; i < rutasOrdenadas.length; i++) {
            if (
              ruta.getUsuarios().length > rutasOrdenadas[i].getUsuarios().length
            ) {
              rutasOrdenadas.splice(i, 0, ruta);
              break;
            } else if (i == rutasOrdenadas.length - 1) {
              rutasOrdenadas.push(ruta);
              break;
            }
          }
        }
      });
    }
    for (let i = 0; i < rutasOrdenadas.length; i++) {
      console.log(rutasOrdenadas[i].getNombre());
    }
    console.log("Pulsa enter para volver al menu principal");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.on("line", () => {
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
      .then((answers) => {
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
    const rutasOrdenadas: Ruta[] = [];
    if (this.rutas.length() > 0) {
      this.rutas.forEach((ruta) => {
        if (rutasOrdenadas.length == 0) {
          rutasOrdenadas.push(ruta);
        } else {
          for (let i = 0; i < rutasOrdenadas.length; i++) {
            if (ruta.getDistancia() < rutasOrdenadas[i].getDistancia()) {
              rutasOrdenadas.splice(i, 0, ruta);
              break;
            } else if (i == rutasOrdenadas.length - 1) {
              rutasOrdenadas.push(ruta);
              break;
            }
          }
        }
      });
    }
    for (let i = 0; i < rutasOrdenadas.length; i++) {
      console.log(rutasOrdenadas[i].getNombre());
    }
    console.log("Pulsa enter para volver al menu principal");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.on("line", () => {
      this.mainMenu();
    });
  }

  public mostrarRutasPorDistanciaDescendente(): void {
    console.clear();
    console.log("Mostrar todas las rutas por distancia descendente");
    const rutasOrdenadas: Ruta[] = [];
    if (this.rutas.length() > 0) {
      this.rutas.forEach((ruta) => {
        if (rutasOrdenadas.length == 0) {
          rutasOrdenadas.push(ruta);
        } else {
          for (let i = 0; i < rutasOrdenadas.length; i++) {
            if (ruta.getDistancia() > rutasOrdenadas[i].getDistancia()) {
              rutasOrdenadas.splice(i, 0, ruta);
              break;
            } else if (i == rutasOrdenadas.length - 1) {
              rutasOrdenadas.push(ruta);
              break;
            }
          }
        }
      });
    }
    for (let i = 0; i < rutasOrdenadas.length; i++) {
      console.log(rutasOrdenadas[i].getNombre());
    }
    console.log("Pulsa enter para volver al menu principal");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.on("line", () => {
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
      .then((answers) => {
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
    const rutasOrdenadas: Ruta[] = [];
    if (this.rutas.length() > 0) {
      this.rutas.forEach((ruta) => {
        if (rutasOrdenadas.length == 0) {
          rutasOrdenadas.push(ruta);
        } else {
          for (let i = 0; i < rutasOrdenadas.length; i++) {
            if (
              ruta.getCalificacionMedia() <
              rutasOrdenadas[i].getCalificacionMedia()
            ) {
              rutasOrdenadas.splice(i, 0, ruta);
              break;
            } else if (i == rutasOrdenadas.length - 1) {
              rutasOrdenadas.push(ruta);
              break;
            }
          }
        }
      });
    }
    for (let i = 0; i < rutasOrdenadas.length; i++) {
      console.log(rutasOrdenadas[i].getNombre());
    }
    console.log("Pulsa enter para volver al menu principal");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.on("line", () => {
      this.mainMenu();
    });
  }

  public mostrarRutasPorCalificacionMediaDescendente(): void {
    console.clear();
    console.log("Mostrar todas las rutas por calificacion media descendente");
    const rutasOrdenadas: Ruta[] = [];
    if (this.rutas.length() > 0) {
      this.rutas.forEach((ruta) => {
        if (rutasOrdenadas.length == 0) {
          rutasOrdenadas.push(ruta);
        } else {
          for (let i = 0; i < rutasOrdenadas.length; i++) {
            if (
              ruta.getCalificacionMedia() >
              rutasOrdenadas[i].getCalificacionMedia()
            ) {
              rutasOrdenadas.splice(i, 0, ruta);
              break;
            } else if (i == rutasOrdenadas.length - 1) {
              rutasOrdenadas.push(ruta);
              break;
            }
          }
        }
      });
    }
    for (let i = 0; i < rutasOrdenadas.length; i++) {
      console.log(rutasOrdenadas[i].getNombre());
    }
    console.log("Pulsa enter para volver al menu principal");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.on("line", () => {
      this.mainMenu();
    });
  }

  public mostrarRutasDeCorrer(): void {
    console.clear();
    console.log("Mostrar todas las rutas de correr");
    const rutasDeCorrer: Ruta[] = [];
    this.rutas.forEach((ruta) => {
      if (ruta.getTipoRuta() == "correr") {
        rutasDeCorrer.push(ruta);
      }
    });
    for (let i = 0; i < rutasDeCorrer.length; i++) {
      console.log(rutasDeCorrer[i].getNombre());
    }
    console.log("Pulsa enter para volver al menu principal");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.on("line", () => {
      this.mainMenu();
    });
  }

  public mostrarRutasDeBicicleta(): void {
    console.clear();
    console.log("Mostrar todas las rutas de bicicleta");
    const rutasDeBicicleta: Ruta[] = [];
    this.rutas.forEach((ruta) => {
      if (ruta.getTipoRuta() == "bicicleta") {
        rutasDeBicicleta.push(ruta);
      }
    });
    for (let i = 0; i < rutasDeBicicleta.length; i++) {
      console.log(rutasDeBicicleta[i].getNombre());
    }
    console.log("Pulsa enter para volver al menu principal");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.on("line", () => {
      this.mainMenu();
    });
  }
}
