import { Usuario } from "./datatypes/usuarios";
import { Ruta } from "./datatypes/rutas";
import { Reto } from "./datatypes/retos";
import { Stats } from "./datatypes/stats";
import { Grupo } from "./datatypes/grupos";
import { UsuarioCollection } from "./collections/usuario_collection";
import { RutaCollection } from "./collections/rutas_collection";
import { RetoCollection } from "./collections/retos_collection";
import { GrupoCollection } from "./collections/grupos_collection";
import readline from "readline";
import inquirer from "inquirer";
import { JsonUsuarios } from "./jsonadapters/jsonusuarios";
import { JsonGrupos } from "./jsonadapters/jsongrupos";
import { JsonRutas } from "./jsonadapters/jsonrutas";
import { JsonRetos } from "./jsonadapters/jsonretos";
import { isConstructorDeclaration } from "typescript";

enum Commandos {
  CrearUsuario = "Crear un usuario",
  CrearRuta = "Crear una ruta",
  CrearReto = "Crear un reto",
  CrearGrupo = "Crear un grupo",
  MostrarUsuarios = "Mostrar usuarios",
  MostrarRutas = "Mostrar rutas",
  MostrarRetos = "Mostrar retos",
  MostrarGrupos = "Mostrar grupos",
  ModificarUsuario = "Modificar un usuario",
  ModificarRuta = "Modificar una ruta",
  ModificarReto = "Modificar un reto",
  ModificarGrupo = "Modificar un grupo",
  Salir = "Salir",
}

export class App {
  private usuarios: UsuarioCollection;
  private rutas: RutaCollection;
  private retos: RetoCollection;
  private grupos: GrupoCollection;

  constructor() {
    this.usuarios = new JsonUsuarios();
    this.rutas = new JsonRutas();
    this.retos = new JsonRetos();
    this.grupos = new JsonGrupos();
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
          inquirer.prompt([
            {
              type: "list",
              name: "command",
              message: "¿Que quieres hacer?",
              choices: ["Volver a intentarlo", "Registrarse"],
            },
          ]);
          if (answers["command"] === "Volver a intentarlo") {
            this.login();
          } else {
            this.register();
          }
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
          case Commandos.MostrarUsuarios:
            this.mostrarUsuarios();
            break;
          case Commandos.MostrarGrupos:
            this.mostrarGrupos();
            break;
          case Commandos.MostrarRutas:
            this.mostrarRutas();
            break;
          case Commandos.MostrarRetos:
            this.mostrarRetos();
            break;
          case Commandos.CrearUsuario:
            this.crearUsuario();
            break;
          case Commandos.CrearGrupo:
            this.crearGrupo();
            break;
          case Commandos.CrearRuta:
            this.crearRuta();
            break;
          case Commandos.CrearReto:
            this.crearReto();
            break;
          case Commandos.ModificarUsuario:
            break;
          case Commandos.ModificarGrupo:
            break;
          case Commandos.ModificarRuta:
            break;
          case Commandos.ModificarReto:
            break;

          case Commandos.Salir:
            console.log("Hasta luego!");
            break;
        }
      });
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
  }
  public mostrarUsuarios(): void {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "usuarios",
          message: "¿Como quieres ver la lista de usuarios?",
          choices: [
            "Mostrar todos los usuarios alfabeticamente",
            "Mostrar todos los usuarios por numero de km recorridos",
          ],
        },
      ])
      .then((answers) => {
        switch (answers.usuarios) {
          case "Mostrar todos los usuarios alfabeticamente":
            this.mostrarUsuariosAlfabeticamente();
            break;
          case "Mostrar todos los usuarios por numero de km recorridos":
            this.mostrarUsuariosPorKmRecorridos();
            break;
        }
      });
  }

  public mostrarUsuariosAlfabeticamente(): void {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "usuarios",
          message: "¿Como quieres ver la lista de usuarios?",
          choices: [
            "Mostrar todos los usuarios alfabeticamente ascendente",
            "Mostrar todos los usuarios alfabeticamente descendente",
          ],
        },
      ])
      .then((answers) => {
        switch (answers.usuarios) {
          case "Mostrar todos los usuarios alfabeticamente ascendente":
            this.mostrarUsuariosAlfabeticamenteAscendente();
            break;
          case "Mostrar todos los usuarios alfabeticamente descendente":
            this.mostrarUsuariosAlfabeticamenteDescendente();
            break;
        }
      });
  }

  public mostrarUsuariosAlfabeticamenteAscendente(): void {
    console.clear();
    console.log("Mostrar todos los usuarios alfabeticamente ascendente");
    const usuariosOrdenados: Usuario[] = [];
    if (this.usuarios.length() > 0) {
      this.usuarios.forEach((usuario) => {
        if (usuariosOrdenados.length == 0) {
          usuariosOrdenados.push(usuario);
        } else {
          for (let i = 0; i < usuariosOrdenados.length; i++) {
            if (usuario.getNombre() < usuariosOrdenados[i].getNombre()) {
              usuariosOrdenados.splice(i, 0, usuario);
              break;
            } else if (i == usuariosOrdenados.length - 1) {
              usuariosOrdenados.push(usuario);
              break;
            }
          }
        }
      });
    }
    for (let i = 0; i < usuariosOrdenados.length; i++) {
      console.log(usuariosOrdenados[i].getNombre());
    }
  }

  public mostrarUsuariosAlfabeticamenteDescendente(): void {
    console.clear();
    console.log("Mostrar todos los usuarios alfabeticamente descendente");
    const usuariosOrdenados: Usuario[] = [];
    if (this.usuarios.length() > 0) {
      this.usuarios.forEach((usuario) => {
        if (usuariosOrdenados.length == 0) {
          usuariosOrdenados.push(usuario);
        } else {
          for (let i = 0; i < usuariosOrdenados.length; i++) {
            if (usuario.getNombre() > usuariosOrdenados[i].getNombre()) {
              usuariosOrdenados.splice(i, 0, usuario);
              break;
            } else if (i == usuariosOrdenados.length - 1) {
              usuariosOrdenados.push(usuario);
              break;
            }
          }
        }
      });
    }
    for (let i = 0; i < usuariosOrdenados.length; i++) {
      console.log(usuariosOrdenados[i].getNombre());
    }
  }

  public mostrarUsuariosPorKmRecorridos(): void {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "usuarios",
          message: "¿Como quieres ver la lista de usuarios?",
          choices: [
            "Mostrar todos los usuarios por numero de km en la semana",
            "Mostrar todos los usuarios por numero de km en el mes",
            "Mostrar todos los usuarios por numero de km en el año",
          ],
        },
      ])
      .then((answers) => {
        switch (answers.usuarios) {
          case "Mostrar todos los usuarios por numero de km en la semana":
            this.mostrarUsuariosPorKmRecorridosSemana();
            break;
          case "Mostrar todos los usuarios por numero de km en el mes":
            this.mostrarUsuariosPorKmRecorridosMes();
            break;
          case "Mostrar todos los usuarios por numero de km en el año":
            this.mostrarUsuariosPorKmRecorridosAnio();
            break;
        }
      });
  }

  public mostrarUsuariosPorKmRecorridosSemana(): void {
    console.clear();
    console.log("Mostrar todos los usuarios por numero de km en la semana");
    const usuariosOrdenados: Usuario[] = [];
    if (this.usuarios.length() > 0) {
      this.usuarios.forEach((usuario) => {
        if (usuariosOrdenados.length == 0) {
          usuariosOrdenados.push(usuario);
        } else {
          for (let i = 0; i < usuariosOrdenados.length; i++) {
            if (
              usuario.getKmRecorridosSemana() >
              usuariosOrdenados[i].getKmRecorridosSemana()
            ) {
              usuariosOrdenados.splice(i, 0, usuario);
              break;
            } else if (i == usuariosOrdenados.length - 1) {
              usuariosOrdenados.push(usuario);
              break;
            }
          }
        }
      });
    }
    for (let i = 0; i < usuariosOrdenados.length; i++) {
      console.log(
        usuariosOrdenados[i].getNombre() +
          " " +
          usuariosOrdenados[i].getKmRecorridosSemana()
      );
    }
  }

  public mostrarUsuariosPorKmRecorridosMes(): void {
    console.clear();
    console.log("Mostrar todos los usuarios por numero de km en el mes");
    const usuariosOrdenados: Usuario[] = [];
    if (this.usuarios.length() > 0) {
      this.usuarios.forEach((usuario) => {
        if (usuariosOrdenados.length == 0) {
          usuariosOrdenados.push(usuario);
        } else {
          for (let i = 0; i < usuariosOrdenados.length; i++) {
            if (
              usuario.getKmRecorridosMes() >
              usuariosOrdenados[i].getKmRecorridosMes()
            ) {
              usuariosOrdenados.splice(i, 0, usuario);
              break;
            } else if (i == usuariosOrdenados.length - 1) {
              usuariosOrdenados.push(usuario);
              break;
            }
          }
        }
      });
    }
    for (let i = 0; i < usuariosOrdenados.length; i++) {
      console.log(
        usuariosOrdenados[i].getNombre() +
          " " +
          usuariosOrdenados[i].getKmRecorridosMes()
      );
    }
  }

  public mostrarUsuariosPorKmRecorridosAnio(): void {
    console.clear();
    console.log("Mostrar todos los usuarios por numero de km en el año");
    const usuariosOrdenados: Usuario[] = [];
    if (this.usuarios.length() > 0) {
      this.usuarios.forEach((usuario) => {
        if (usuariosOrdenados.length == 0) {
          usuariosOrdenados.push(usuario);
        } else {
          for (let i = 0; i < usuariosOrdenados.length; i++) {
            if (
              usuario.getKmRecorridosAnio() >
              usuariosOrdenados[i].getKmRecorridosAnio()
            ) {
              usuariosOrdenados.splice(i, 0, usuario);
              break;
            } else if (i == usuariosOrdenados.length - 1) {
              usuariosOrdenados.push(usuario);
              break;
            }
          }
        }
      });
    }
    for (let i = 0; i < usuariosOrdenados.length; i++) {
      console.log(
        usuariosOrdenados[i].getNombre() +
          " " +
          usuariosOrdenados[i].getKmRecorridosAnio()
      );
    }
  }

  public mostrarGrupos(): void {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "grupos",
          message: "¿Como quieres ver la lista de grupos?",
          choices: [
            "Mostrar todos los grupos alfabeticamente",
            "Mostrar todos los grupos por numero de km recorridos",
            "Mostrar todos los grupos por numero de miembros",
          ],
        },
      ])
      .then((answers) => {
        switch (answers.grupos) {
          case "Mostrar todos los grupos alfabeticamente":
            this.mostrarGruposAlfabeticamente();
            break;
          case "Mostrar todos los grupos por numero de km recorridos":
            this.mostrarGruposPorKmRecorridos();
            break;
          case "Mostrar todos los grupos por numero de miembros":
            this.mostrarGruposPorNumeroDeMiembros();
            break;
        }
      });
  }

  public mostrarGruposAlfabeticamente(): void {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "grupos",
          message: "¿Como quieres ver la lista de grupos?",
          choices: [
            "Mostrar todos los grupos alfabeticamente ascendente",
            "Mostrar todos los grupos alfabeticamente descendente",
          ],
        },
      ])
      .then((answers) => {
        switch (answers.grupos) {
          case "Mostrar todos los grupos alfabeticamente ascendente":
            this.mostrarGruposAlfabeticamenteAscendente();
            break;
          case "Mostrar todos los grupos alfabeticamente descendente":
            this.mostrarGruposAlfabeticamenteDescendente();
            break;
        }
      });
  }

  public mostrarGruposAlfabeticamenteAscendente(): void {
    console.clear();
    console.log("Mostrar todos los grupos alfabeticamente ascendente");
    const gruposOrdenados: Grupo[] = [];
    if (this.grupos.length() > 0) {
      this.grupos.forEach((grupo) => {
        if (gruposOrdenados.length == 0) {
          gruposOrdenados.push(grupo);
        } else {
          for (let i = 0; i < gruposOrdenados.length; i++) {
            if (
              grupo.nombre.toLowerCase() <
              gruposOrdenados[i].nombre.toLowerCase()
            ) {
              gruposOrdenados.splice(i, 0, grupo);
              break;
            } else if (i == gruposOrdenados.length - 1) {
              gruposOrdenados.push(grupo);
              break;
            }
          }
        }
      });
    }
    for (let i = 0; i < gruposOrdenados.length; i++) {
      console.log(gruposOrdenados[i].nombre);
    }
  }

  public mostrarGruposAlfabeticamenteDescendente(): void {
    console.clear();
    console.log("Mostrar todos los grupos alfabeticamente descendente");
    const gruposOrdenados: Grupo[] = [];
    if (this.grupos.length() > 0) {
      this.grupos.forEach((grupo) => {
        if (gruposOrdenados.length == 0) {
          gruposOrdenados.push(grupo);
        } else {
          for (let i = 0; i < gruposOrdenados.length; i++) {
            if (
              grupo.nombre.toLowerCase() >
              gruposOrdenados[i].nombre.toLowerCase()
            ) {
              gruposOrdenados.splice(i, 0, grupo);
              break;
            } else if (i == gruposOrdenados.length - 1) {
              gruposOrdenados.push(grupo);
              break;
            }
          }
        }
      });
    }
    for (let i = 0; i < gruposOrdenados.length; i++) {
      console.log(gruposOrdenados[i].nombre);
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

  public mostrarGruposPorKmRecorridos(): void {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "grupos",
          message: "¿Como quieres ver la lista de grupos?",
          choices: [
            "Mostrar todos los grupos por numero de km recorridos en la semana",
            "Mostrar todos los grupos por numero de km recorridos en el mes",
            "Mostrar todos los grupos por numero de km recorridos en el año",
          ],
        },
      ])
      .then((answers) => {
        switch (answers.grupos) {
          case "Mostrar todos los grupos por numero de km recorridos en la semana":
            this.mostrarGruposPorKmRecorridosSemana();
            break;
          case "Mostrar todos los grupos por numero de km recorridos en el mes":
            this.mostrarGruposPorKmRecorridosMes();
            break;
          case "Mostrar todos los grupos por numero de km recorridos en el año":
            this.mostrarGruposPorKmRecorridosAnio();
            break;
        }
      });
  }

  public mostrarGruposPorKmRecorridosSemana(): void {
    console.clear();
    console.log(
      "Mostrar todos los grupos por numero de km recorridos en la semana"
    );
    const gruposOrdenados: Grupo[] = [];
    if (this.grupos.length() > 0) {
      this.grupos.forEach((grupo) => {
        if (gruposOrdenados.length == 0) {
          gruposOrdenados.push(grupo);
        } else {
          for (let i = 0; i < gruposOrdenados.length; i++) {
            if (
              grupo.getKmRecorridosSemana() >
              gruposOrdenados[i].getKmRecorridosSemana()
            ) {
              gruposOrdenados.splice(i, 0, grupo);
              break;
            } else if (i == gruposOrdenados.length - 1) {
              gruposOrdenados.push(grupo);
              break;
            }
          }
        }
      });
    }
    for (let i = 0; i < gruposOrdenados.length; i++) {
      console.log(
        gruposOrdenados[i].nombre +
          " " +
          gruposOrdenados[i].getKmRecorridosSemana()
      );
    }
  }

  public mostrarGruposPorKmRecorridosMes(): void {
    console.clear();
    console.log(
      "Mostrar todos los grupos por numero de km recorridos en el mes"
    );
    const gruposOrdenados: Grupo[] = [];
    if (this.grupos.length() > 0) {
      this.grupos.forEach((grupo) => {
        if (gruposOrdenados.length == 0) {
          gruposOrdenados.push(grupo);
        } else {
          for (let i = 0; i < gruposOrdenados.length; i++) {
            if (
              grupo.getKmRecorridosMes() >
              gruposOrdenados[i].getKmRecorridosMes()
            ) {
              gruposOrdenados.splice(i, 0, grupo);
              break;
            } else if (i == gruposOrdenados.length - 1) {
              gruposOrdenados.push(grupo);
              break;
            }
          }
        }
      });
    }
    for (let i = 0; i < gruposOrdenados.length; i++) {
      console.log(
        gruposOrdenados[i].nombre +
          " " +
          gruposOrdenados[i].getKmRecorridosMes()
      );
    }
  }

  public mostrarGruposPorKmRecorridosAnio(): void {
    console.clear();
    console.log(
      "Mostrar todos los grupos por numero de km recorridos en el año"
    );
    const gruposOrdenados: Grupo[] = [];
    if (this.grupos.length() > 0) {
      this.grupos.forEach((grupo) => {
        if (gruposOrdenados.length == 0) {
          gruposOrdenados.push(grupo);
        } else {
          for (let i = 0; i < gruposOrdenados.length; i++) {
            if (
              grupo.getKmRecorridosAnio() >
              gruposOrdenados[i].getKmRecorridosAnio()
            ) {
              gruposOrdenados.splice(i, 0, grupo);
              break;
            } else if (i == gruposOrdenados.length - 1) {
              gruposOrdenados.push(grupo);
              break;
            }
          }
        }
      });
    }
    for (let i = 0; i < gruposOrdenados.length; i++) {
      console.log(
        gruposOrdenados[i].nombre +
          " " +
          gruposOrdenados[i].getKmRecorridosAnio()
      );
    }
  }

  public mostrarGruposPorNumeroDeMiembros(): void {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "grupos",
          message: "¿Como quieres ver la lista de grupos?",
          choices: [
            "Mostrar todos los grupos por numero de miembros ascendente",
            "Mostrar todos los grupos por numero de miembros descendente",
          ],
        },
      ])
      .then((answers) => {
        switch (answers.grupos) {
          case "Mostrar todos los grupos por numero de miembros ascendente":
            this.mostrarGruposPorNumeroDeMiembrosAscendente();
            break;
          case "Mostrar todos los grupos por numero de miembros descendente":
            this.mostrarGruposPorNumeroDeMiembrosDescendente();
            break;
        }
      });
  }

  public mostrarGruposPorNumeroDeMiembrosAscendente(): void {
    console.clear();
    console.log("Mostrar todos los grupos por numero de miembros ascendente");
    const gruposOrdenados: Grupo[] = [];
    if (this.grupos.length() > 0) {
      this.grupos.forEach((grupo) => {
        if (gruposOrdenados.length == 0) {
          gruposOrdenados.push(grupo);
        } else {
          for (let i = 0; i < gruposOrdenados.length; i++) {
            if (
              grupo.getMiembros().length <
              gruposOrdenados[i].getMiembros().length
            ) {
              gruposOrdenados.splice(i, 0, grupo);
              break;
            } else if (i == gruposOrdenados.length - 1) {
              gruposOrdenados.push(grupo);
              break;
            }
          }
        }
      });
    }
    for (let i = 0; i < gruposOrdenados.length; i++) {
      console.log(gruposOrdenados[i].nombre);
    }
  }

  public mostrarGruposPorNumeroDeMiembrosDescendente(): void {
    console.clear();
    console.log("Mostrar todos los grupos por numero de miembros descendente");
    const gruposOrdenados: Grupo[] = [];
    if (this.grupos.length() > 0) {
      this.grupos.forEach((grupo) => {
        if (gruposOrdenados.length == 0) {
          gruposOrdenados.push(grupo);
        } else {
          for (let i = 0; i < gruposOrdenados.length; i++) {
            if (
              grupo.getMiembros().length >
              gruposOrdenados[i].getMiembros().length
            ) {
              gruposOrdenados.splice(i, 0, grupo);
              break;
            } else if (i == gruposOrdenados.length - 1) {
              gruposOrdenados.push(grupo);
              break;
            }
          }
        }
      });
    }
    for (let i = 0; i < gruposOrdenados.length; i++) {
      console.log(gruposOrdenados[i].nombre);
    }
  }
  crearUsuario() {
    console.clear();
    inquirer
      .prompt([
        {
          type: "input",
          name: "nombre",
          message: "Introduce el nombre del usuario",
        },
        {
          type: "list",
          name: "actividad",
          message: "Introduce la actividad que mas practica el usuario",
          choices: ["correr", "bicicleta"],
        },
      ])
      .then((answers) => {
        if (answers.nombre == "") {
          console.log("Error al crear el usuario, nombre vacio");
          this.crearUsuario();
        } else {
          const user = this.usuarios.findElement(answers.nombre);
          if (user != undefined) {
            console.log("El usuario ya existe");
            this.crearUsuario();
          } else {
            this.usuarios.addElement(
              new Usuario(
                answers.nombre,
                answers.actividad,
                [],
                new Stats(),
                [],
                [],
                []
              )
            );
            console.log("Usuario creado correctamente");
          }
        }
      });
  }
  crearGrupo() {
    console.clear();
    inquirer
      .prompt([
        {
          type: "input",
          name: "nombre",
          message: "Introduce el nombre del grupo",
        },
        {
          type: "input",
          name: "miembros",
          message: "Introduce los miembros del grupo separados por comas",
        },
      ])
      .then((answers) => {
        if (answers.nombre == "") {
          console.log("Error al crear el grupo, nombre vacio");
          this.crearGrupo();
        } else {
          const grupo = this.grupos.findElement(answers.nombre);
          if (grupo != undefined) {
            console.log("El grupo ya existe");
            this.crearGrupo();
          } else {
            const miembros: number[] = [];
            const miembrosString = answers.miembros.split(",");
            for (let i = 0; i < miembrosString.length; i++) {
              const usuario = this.usuarios.findElement(miembrosString[i]);
              if (usuario != undefined) {
                miembros.push(usuario.id);
              }
            }
            this.grupos.addElement(
              new Grupo(answers.nombre, miembros, new Stats(), [], [], [])
            );
            console.log("Grupo creado correctamente");
          }
        }
      });
  }
  crearRuta() {
    console.clear();
  }
  crearReto() {
    console.clear();
  }
}
