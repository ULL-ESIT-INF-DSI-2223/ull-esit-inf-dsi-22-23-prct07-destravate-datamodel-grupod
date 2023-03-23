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
  MostrarUsuarios = "Mostrar usuarios",
  MostrarRutas = "Mostrar rutas",
  MostrarRetos = "Mostrar retos",
  MostrarGrupos = "Mostrar grupos",
  ModificarUsuario = "Modificar un usuario",
  ModificarRuta = "Modificar una ruta",
  ModificarReto = "Modificar un reto",
  ModificarGrupo = "Modificar un grupo",
  EliminarUsuario = "Eliminar un usuario",
  EliminarRuta = "Eliminar una ruta",
  EliminarReto = "Eliminar un reto",
  EliminarGrupo = "Eliminar un grupo",
  Salir = "Salir",
}

export class App {
  private usuarios: UsuarioCollection;
  private rutas: RutaCollection;
  private retos: RetoCollection;
  private grupos: GrupoCollection;
  private current_user: Usuario;

  constructor() {
    this.usuarios = new JsonUsuarios();
    this.rutas = new JsonRutas();
    this.retos = new JsonRetos();
    this.grupos = new JsonGrupos();
    this.current_user = new Usuario(
      "none",
      undefined,
      [],
      new Stats(),
      [],
      [],
      []
    );
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
          this.current_user = user;
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
          const user = new Usuario(
            username,
            undefined,
            [],
            new Stats(),
            [],
            [],
            []
          );
          this.usuarios.addElement(user);
          this.current_user = user;
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
            this.modificarUsuario();
            break;
          case Commandos.ModificarGrupo:
            this.modificarGrupo();
            this.modificarGrupo();
            break;
          case Commandos.ModificarRuta:
            this.modificarRuta();
            break;
          case Commandos.ModificarReto:
            this.modificarReto();
            break;
          case Commandos.EliminarUsuario:
            this.eliminarUsuario();
            break;
          case Commandos.EliminarGrupo:
            this.eliminarGrupo();
            break;
          case Commandos.EliminarRuta:
            this.eliminarRuta();
            break;
          case Commandos.EliminarReto:
            this.eliminarReto();
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
            this.mainMenu();
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
              new Grupo(
                answers.nombre,
                miembros,
                new Stats(),
                [],
                [],
                [],
                this.current_user.id
              )
            );
            this.mainMenu();
          }
        }
      });
  }

  public mostrarRetos(): void {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "retos",
          message: "¿Como quieres ver la lista de retos?",
          choices: [
            "Mostrar todos los retos por nombre",
            "Mostrar todos los retos por numero de km totales",
            "Mostrar todos los retos por numero de km usuarios registrados",
          ],
        },
      ])
      .then((answers) => {
        switch (answers.retos) {
          case "Mostrar todos los retos por numero de participantes":
            this.mostrarRetosPorNombre();
            break;
          case "Mostrar todos los retos por numero de km recorridos":
            this.mostrarRetosPorKmTotales();
            break;
          case "Mostrar todos los retos por numero de km recorridos en la semana":
            this.mostrarRetosPorUsuariosRegistrados();
            break;
        }
      });
  }

  public mostrarRetosPorNombre(): void {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "retos",
          message: "¿Como quieres ver la lista de retos?",
          choices: [
            "Mostrar todos los retos por nombre ascendente",
            "Mostrar todos los retos por nombre descendente",
          ],
        },
      ])
      .then((answers) => {
        switch (answers.retos) {
          case "Mostrar todos los retos por nombre ascendente":
            this.mostrarRetosPorNombreAscendente();
            break;
          case "Mostrar todos los retos por nombre descendente":
            this.mostrarRetosPorNombreDescendente();
            break;
        }
      });
  }

  public mostrarRetosPorNombreAscendente(): void {
    console.clear();
    console.log("Mostrar todos los retos por nombre ascendente");
    const retosOrdenados: Reto[] = [];
    if (this.retos.length() > 0) {
      this.retos.forEach((reto) => {
        if (retosOrdenados.length == 0) {
          retosOrdenados.push(reto);
        } else {
          for (let i = 0; i < retosOrdenados.length; i++) {
            if (reto.nombre < retosOrdenados[i].nombre) {
              retosOrdenados.splice(i, 0, reto);
              break;
            } else if (i == retosOrdenados.length - 1) {
              retosOrdenados.push(reto);
              break;
            }
          }
        }
      });
    }
    for (let i = 0; i < retosOrdenados.length; i++) {
      console.log(retosOrdenados[i].nombre);
    }
  }

  public mostrarRetosPorNombreDescendente(): void {
    console.clear();
    console.log("Mostrar todos los retos por nombre descendente");
    const retosOrdenados: Reto[] = [];
    if (this.retos.length() > 0) {
      this.retos.forEach((reto) => {
        if (retosOrdenados.length == 0) {
          retosOrdenados.push(reto);
        } else {
          for (let i = 0; i < retosOrdenados.length; i++) {
            if (reto.nombre > retosOrdenados[i].nombre) {
              retosOrdenados.splice(i, 0, reto);
              break;
            } else if (i == retosOrdenados.length - 1) {
              retosOrdenados.push(reto);
              break;
            }
          }
        }
      });
    }
    for (let i = 0; i < retosOrdenados.length; i++) {
      console.log(retosOrdenados[i].nombre);
    }
  }

  public mostrarRetosPorKmTotales(): void {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "retos",
          message: "¿Como quieres ver la lista de retos?",
          choices: [
            "Mostrar todos los retos por numero de km totales ascendente",
            "Mostrar todos los retos por numero de km totales descendente",
          ],
        },
      ])
      .then((answers) => {
        switch (answers.retos) {
          case "Mostrar todos los retos por numero de km totales ascendente":
            this.mostrarRetosPorKmTotalesAscendente();
            break;
          case "Mostrar todos los retos por numero de km totales descendente":
            this.mostrarRetosPorKmTotalesDescendente();
            break;
        }
      });
  }

  public mostrarRetosPorKmTotalesAscendente(): void {
    console.clear();
    console.log("Mostrar todos los retos por numero de km totales ascendente");
    const retosOrdenados: Reto[] = [];
    if (this.retos.length() > 0) {
      this.retos.forEach((reto) => {
        if (retosOrdenados.length == 0) {
          retosOrdenados.push(reto);
        } else {
          for (let i = 0; i < retosOrdenados.length; i++) {
            if (reto.getKmTotales() < retosOrdenados[i].getKmTotales()) {
              retosOrdenados.splice(i, 0, reto);
              break;
            } else if (i == retosOrdenados.length - 1) {
              retosOrdenados.push(reto);
              break;
            }
          }
        }
      });
    }
    for (let i = 0; i < retosOrdenados.length; i++) {
      console.log(retosOrdenados[i].nombre);
    }
  }

  public mostrarRetosPorKmTotalesDescendente(): void {
    console.clear();
    console.log("Mostrar todos los retos por numero de km totales descendente");
    const retosOrdenados: Reto[] = [];
    console.log("cuantos retos hay" + this.retos.length());
    if (this.retos.length() > 0) {
      this.retos.forEach((reto) => {
        if (retosOrdenados.length == 0) {
          retosOrdenados.push(reto);
        } else {
          for (let i = 0; i < retosOrdenados.length; i++) {
            if (reto.getKmTotales() > retosOrdenados[i].getKmTotales()) {
              retosOrdenados.splice(i, 0, reto);
              break;
            } else if (i == retosOrdenados.length - 1) {
              retosOrdenados.push(reto);
              break;
            }
          }
        }
      });
    }
    for (let i = 0; i < retosOrdenados.length; i++) {
      console.log(retosOrdenados[i].nombre);
    }
  }

  public mostrarRetosPorUsuariosRegistrados(): void {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "retos",
          message: "¿Como quieres ver la lista de retos?",
          choices: [
            "Mostrar todos los retos por numero de usuarios registrados ascendente",
            "Mostrar todos los retos por numero de usuarios registrados descendente",
          ],
        },
      ])
      .then((answers) => {
        switch (answers.retos) {
          case "Mostrar todos los retos por numero de usuarios registrados ascendente":
            this.mostrarRetosPorUsuariosRegistradosAscendente();
            break;
          case "Mostrar todos los retos por numero de usuarios registrados descendente":
            this.mostrarRetosPorUsuariosRegistradosDescendente();
            break;
        }
      });
    console.log("Pulsa enter para volver al menu principal");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.on("line", () => {
      this.mainMenu();
    });
  }

  public mostrarRetosPorUsuariosRegistradosAscendente(): void {
    console.clear();
    console.log(
      "Mostrar todos los retos por numero de usuarios registrados ascendente"
    );
    const retosOrdenados: Reto[] = [];
    if (this.retos.length() > 0) {
      this.retos.forEach((reto) => {
        if (retosOrdenados.length == 0) {
          retosOrdenados.push(reto);
        } else {
          for (let i = 0; i < retosOrdenados.length; i++) {
            if (
              reto.getUsuariosRealizandoReto() <
              retosOrdenados[i].getUsuariosRealizandoReto()
            ) {
              retosOrdenados.splice(i, 0, reto);
              break;
            } else if (i == retosOrdenados.length - 1) {
              retosOrdenados.push(reto);
              break;
            }
          }
        }
      });
    }
    for (let i = 0; i < retosOrdenados.length; i++) {
      console.log(retosOrdenados[i].nombre);
    }
  }

  public mostrarRetosPorUsuariosRegistradosDescendente(): void {
    console.clear();
    console.log(
      "Mostrar todos los retos por numero de usuarios registrados descendente"
    );
    const retosOrdenados: Reto[] = [];
    if (this.retos.length() > 0) {
      this.retos.forEach((reto) => {
        if (retosOrdenados.length == 0) {
          retosOrdenados.push(reto);
        } else {
          for (let i = 0; i < retosOrdenados.length; i++) {
            if (
              reto.getUsuariosRealizandoReto() >
              retosOrdenados[i].getUsuariosRealizandoReto()
            ) {
              retosOrdenados.splice(i, 0, reto);
              break;
            } else if (i == retosOrdenados.length - 1) {
              retosOrdenados.push(reto);
              break;
            }
          }
        }
      });
    }
    for (let i = 0; i < retosOrdenados.length; i++) {
      console.log(retosOrdenados[i].nombre);
    }
  }

  crearRuta() {
    console.clear();
    inquirer
      .prompt([
        {
          type: "input",
          name: "nombre",
          message: "Introduce el nombre de la ruta",
        },
        {
          type: "input",
          name: "longitud",
          message: "Introduce la longitud de la ruta",
        },
        {
          type: "input",
          name: "desnivel",
          message: "Introduce el desnivel de la ruta",
        },
        {
          type: "input",
          name: "coordenadas_inicio",
          message:
            "Introduce las coordenadas de inicio de la ruta separadas por comas",
        },
        {
          type: "input",
          name: "coordenadas_fin",
          message:
            "Introduce las coordenadas de fin de la ruta separadas por comas",
        },
        {
          type: "input",
          name: "tipo_ruta",
          message: "Introduce el tipo de ruta",
        },
      ])
      .then((answers) => {
        if (
          answers.nombre == "" ||
          answers.longitud < 0 ||
          answers.desnivel < 0 ||
          answers.coordenadas_inicio[0] == "" ||
          answers.coordenadas_inicio[1] == "" ||
          answers.coordenadas_fin[0] == "" ||
          answers.coordenadas_fin[1] == "" ||
          answers.tipo_ruta == ""
        ) {
          console.log("Error al crear la ruta, datos incorrectos");
          this.crearRuta();
        } else {
          const ruta = this.rutas.findElement(answers.nombre);
          if (ruta != undefined) {
            console.log("La ruta ya existe");
            this.crearRuta();
          } else {
            const coordenadas_inicio = answers.coordenadas_inicio.split(",");
            const coordenadas_fin = answers.coordenadas_fin.split(",");
            this.rutas.addElement(
              new Ruta(
                answers.nombre,
                [coordenadas_inicio[0], coordenadas_inicio[1]],
                [coordenadas_fin[0], coordenadas_fin[1]],
                answers.longitud,
                answers.desnivel,
                [],
                answers.tipo_ruta,
                []
              )
            );
            this.mainMenu();
          }
        }
      });
  }
  crearReto() {
    console.clear();
    inquirer
      .prompt([
        {
          type: "input",
          name: "nombre",
          message: "Introduce el nombre del reto",
        },
        {
          type: "input",
          name: "tipo_reto",
          message: "Introduce el tipo de reto",
        },
        {
          type: "input",
          name: "km_totales",
          message: "Introduce los km totales del reto",
        },
      ])
      .then((answers) => {
        if (
          answers.nombre == "" ||
          answers.tipo_reto == "" ||
          answers.km_totales < 0
        ) {
          console.log("Error al crear el reto, datos incorrectos");
          this.crearReto();
        } else {
          const reto = this.retos.findElement(answers.nombre);
          if (reto != undefined) {
            console.log("El reto ya existe");
            this.crearReto();
          } else {
            this.retos.addElement(
              new Reto(
                answers.nombre,
                [],
                answers.tipo_reto,
                answers.km_totales,
                []
              )
            );
            this.mainMenu();
          }
        }
      });
  }
  modificarUsuario() {
    console.clear();
    inquirer
      .prompt([
        {
          type: "input",
          name: "usuario",
          message: "Introduce el nombre del usuario",
        },
      ])
      .then((answers) => {
        const usuario = this.usuarios.findElement(answers.usuario);
        if (usuario != undefined) {
          inquirer
            .prompt([
              {
                type: "list",
                name: "actividad",
                message: "¿Que desea hacer?",
                choices: [
                  "Cambiar nombre",
                  "Cambiar actividad",
                  "Añadir amigo",
                  "Añadir ruta favorita",
                  "Añadir reto",
                  "Añadir rutas",
                ],
              },
            ])
            .then((answers) => {
              switch (answers.actividad) {
                case "Cambiar nombre":
                  this.cambiarNombre(usuario);
                  break;
                case "Cambiar actividad":
                  this.cambiarActividad(usuario);
                  break;
                case "Añadir amigo":
                  this.anadirAmigo(usuario);
                  break;
                case "Añadir ruta favorita":
                  this.anadirRutaFavorita(usuario);
                  break;
                case "Añadir reto":
                  this.anadirReto(usuario);
                  break;
                case "Añadir rutas":
                  this.anadirRutas(usuario);
                  break;
              }
            });
        }
      });
  }
  cambiarNombre(usuario: Usuario) {
    console.clear();
    inquirer
      .prompt([
        {
          type: "input",
          name: "nombre",
          message: "Introduce el nuevo nombre",
        },
      ])
      .then((answers) => {
        if (answers.nombre == "") {
          console.log("Error al cambiar el nombre, nombre vacio");
          this.cambiarNombre(usuario);
        } else {
          const usuario2 = this.usuarios.findElement(answers.nombre);
          if (usuario2 != undefined) {
            console.log("El nombre ya existe");
            this.cambiarNombre(usuario);
          } else {
            usuario.cambiarNombre(answers.nombre);
            this.usuarios.updateElement(usuario);
            this.mainMenu();
          }
        }
      });
  }
  cambiarActividad(usuario: Usuario) {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "actividad",
          message: "Selecciona la nueva actividad",
          choices: ["correr", "bicicleta"],
        },
      ])
      .then((answers) => {
        usuario.cambiarActividad(answers.actividad);
        this.mainMenu();
      });
  }
  anadirAmigo(usuario: Usuario) {
    console.clear();
    inquirer
      .prompt([
        {
          type: "input",
          name: "nombre",
          message: "Introduce el nombre del amigo",
        },
      ])
      .then((answers) => {
        const usuario2 = this.usuarios.findElement(answers.nombre);
        if (usuario2 != undefined) {
          usuario.addAmigo(usuario2.id);
          this.usuarios.updateElement(usuario);
          this.mainMenu();
        } else {
          console.log("El usuario no existe");
          this.anadirAmigo(usuario);
        }
      });
  }
  anadirRutaFavorita(usuario: Usuario) {
    console.clear();
    inquirer
      .prompt([
        {
          type: "input",
          name: "nombre",
          message: "Introduce el nombre de la ruta",
        },
      ])
      .then((answers) => {
        const ruta = this.rutas.findElement(answers.nombre);
        if (ruta != undefined) {
          usuario.addRutaFavorita(ruta.id);
          this.usuarios.updateElement(usuario);
          this.mainMenu();
        } else {
          console.log("La ruta no existe");
          this.anadirRutaFavorita(usuario);
        }
      });
  }
  anadirReto(usuario: Usuario) {
    console.clear();
    inquirer
      .prompt([
        {
          type: "input",
          name: "nombre",
          message: "Introduce el nombre del reto",
        },
      ])
      .then((answers) => {
        const reto = this.retos.findElement(answers.nombre);
        if (reto != undefined) {
          usuario.addRetoActivo(reto.id);
          this.usuarios.updateElement(usuario);
          this.mainMenu();
        } else {
          console.log("El reto no existe");
          this.anadirReto(usuario);
        }
      });
  }
  anadirRutas(usuario: Usuario) {
    console.clear();
    inquirer
      .prompt([
        {
          type: "input",
          name: "nombre",
          message: "Introduce el nombre de la ruta",
        },
      ])
      .then((answers) => {
        const ruta = this.rutas.findElement(answers.nombre);
        if (ruta != undefined) {
          usuario.addHistoricoRuta(ruta);
          this.usuarios.updateElement(usuario);
          this.mainMenu();
        } else {
          console.log("La ruta no existe");
          this.anadirRutas(usuario);
        }
      });
  }

  modificarReto(): void {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "retos",
          message: "¿Que reto quieres modificar?",
          choices: this.retos.getNombres(),
        },
      ])
      .then((answers) => {
        const reto: Reto = this.retos.getReto(answers.retos);
        inquirer
          .prompt([
            {
              type: "list",
              name: "modificar",
              message: "¿Que quieres modificar?",
              choices: [
                "Nombre",
                "Tipo de reto",
                "Km totales",
                "Usuarios realizando el reto",
                "Rutas del reto",
              ],
            },
          ])
          .then((answers) => {
            switch (answers.modificar) {
              case "Nombre":
                this.modificarNombreReto(reto);
                break;
              case "Fecha de inicio":
                this.modificarTipoReto(reto);
                break;
              case "Fecha de fin":
                this.modificarKmTotalesReto(reto);
                break;
              case "Km totales":
                this.modificarUsuariosRealizandoReto(reto);
                break;
              case "Km diarios":
                this.modificarRutasReto(reto);
                break;
            }
          });
      });
  }

  modificarNombreReto(reto: Reto): void {
    console.clear();
    inquirer
      .prompt([
        {
          type: "input",
          name: "nombre",
          message: "Introduce el nuevo nombre del reto",
        },
      ])
      .then((answers) => {
        reto.nombre = answers.nombre;
        console.log("Nombre modificado correctamente");
      });
  }

  modificarTipoReto(reto: Reto): void {
    console.clear();
    inquirer
      .prompt([
        {
          type: "input",
          name: "tipo",
          message: "Introduce el nuevo tipo de reto",
        },
      ])
      .then((answers) => {
        reto.setTipoReto(answers.tipo);
        console.log("Tipo de reto modificado correctamente");
      });
  }

  modificarKmTotalesReto(reto: Reto): void {
    console.clear();
    inquirer
      .prompt([
        {
          type: "input",
          name: "kmTotales",
          message: "Introduce los nuevos km totales del reto",
        },
      ])
      .then((answers) => {
        reto.setKmTotales(answers.kmTotales);
        console.log("Km totales modificados correctamente");
      });
  }

  modificarUsuariosRealizandoReto(reto: Reto): void {
    console.clear();
    inquirer
      .prompt([
        {
          type: "input",
          name: "usuariosRealizandoReto",
          message:
            "Introduce los nuevos usuarios realizando el reto separados por comas",
        },
      ])
      .then((answers) => {
        let usuariosRealizandoReto: number[] = [];
        usuariosRealizandoReto = answers.usuariosRealizandoReto.split(",");
        reto.setUsuariosRealizandoReto(usuariosRealizandoReto);
        console.log("Usuarios realizando el reto modificados correctamente");
      });
  }

  modificarRutasReto(reto: Reto): void {
    console.clear();
    inquirer
      .prompt([
        {
          type: "input",
          name: "rutas",
          message: "Introduce las nuevas rutas del reto separadas por comas",
        },
      ])
      .then((answers) => {
        let rutas: number[] = [];
        rutas = answers.rutas.split(",");
        reto.setRuta(rutas);
        console.log("Rutas modificadas correctamente");
      });
  }

  eliminarUsuario(): void {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "usuarios",
          message: "¿Que usuario quieres eliminar?",
          choices: this.usuarios.getNombres(),
        },
      ])
      .then((answers) => {
        this.usuarios.removeElement(answers.usuarios);
        console.log("Usuario eliminado correctamente");
      });
  }

  eliminarReto(): void {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "retos",
          message: "¿Que reto quieres eliminar?",
          choices: this.retos.getNombres(),
        },
      ])
      .then((answers) => {
        this.retos.removeElement(answers.retos);
        console.log("Reto eliminado correctamente");
      });
  }

  eliminarRuta(): void {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "rutas",
          message: "¿Que ruta quieres eliminar?",
          choices: this.rutas.getNombres(),
        },
      ])
      .then((answers) => {
        this.rutas.removeElement(answers.rutas);
        console.log("Ruta eliminada correctamente");
      });
  }

  eliminarGrupo(): void {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "grupos",
          message: "¿Que grupo quieres eliminar?",
          choices: this.grupos.getNombres(),
        },
      ])
      .then((answers) => {
        const grupo = this.grupos.findElement(answers.grupos);
        if (grupo == undefined) {
          console.log("No existe el grupo");
          this.mainMenu();
        } else if (grupo.getOwner() !== this.current_user.id) {
          console.log("No eres el propietario del grupo");
          this.mainMenu();
        } else {
          this.grupos.removeElement(answers.grupos);
          console.log("Grupo eliminado correctamente");
          this.mainMenu();
        }
        this.grupos.removeElement(answers.grupos);
        console.log("Grupo eliminado correctamente");
      });
  }
  modificarGrupo() {
    console.clear();
    inquirer
      .prompt([
        {
          type: "input",
          name: "grupo",
          message: "Introduce el nombre del grupo",
        },
      ])
      .then((answers) => {
        const grupo = this.grupos.findElement(answers.grupo);
        if (grupo != undefined) {
          if (grupo.getOwner() !== this.current_user.id) {
            console.log("No eres el propietario del grupo");
            this.mainMenu();
          } else {
            inquirer
              .prompt([
                {
                  type: "list",
                  name: "actividad",
                  message: "¿Que desea hacer?",
                  choices: [
                    "Cambiar nombre",
                    "Añadir miembro",
                    "Añadir ruta favorita",
                    "Eliminar grupo",
                  ],
                },
              ])
              .then((answers) => {
                switch (answers.actividad) {
                  case "Cambiar nombre":
                    this.cambiarNombreGrupo(grupo);
                    break;
                  case "Añadir miembro":
                    this.addMiembro(grupo);
                    break;
                  case "Añadir ruta favorita":
                    this.addRutaFavoritaGrupo(grupo);
                    break;
                  case "Eliminar grupo":
                    this.eliminarGrupo(grupo);
                    break;
                }
              });
          }
        }
      });
  }
  cambiarNombreGrupo(grupo: Grupo) {
    console.clear();
    inquirer
      .prompt([
        {
          type: "input",
          name: "nombre",
          message: "Introduce el nuevo nombre",
        },
      ])
      .then((answers) => {
        if (answers.nombre == "") {
          console.log("Error al cambiar el nombre, nombre vacio");
          this.cambiarNombreGrupo(grupo);
        } else {
          const grupo2 = this.grupos.findElement(answers.nombre);
          if (grupo2 != undefined) {
            console.log("El nombre ya existe");
            this.cambiarNombreGrupo(grupo);
          } else {
            grupo.cambiarNombre(answers.nombre);
            this.grupos.updateElement(grupo);
            this.mainMenu();
          }
        }
      });
  }
  addMiembro(grupo: Grupo) {
    console.clear();
    inquirer
      .prompt([
        {
          type: "input",
          name: "nombre",
          message: "Introduce el nombre del miembro",
        },
      ])
      .then((answers) => {
        const usuario = this.usuarios.findElement(answers.nombre);
        if (usuario != undefined) {
          grupo.addMiembro(usuario.id);
          this.grupos.updateElement(grupo);
          this.mainMenu();
        } else {
          console.log("El usuario no existe");
          this.addMiembro(grupo);
        }
      });
  }
  addRutaFavoritaGrupo(grupo: Grupo) {
    console.clear();
    inquirer
      .prompt([
        {
          type: "input",
          name: "nombre",
          message: "Introduce el nombre de la ruta",
        },
      ])
      .then((answers) => {
        const ruta = this.rutas.findElement(answers.nombre);
        if (ruta != undefined) {
          grupo.addRutaFavorita(ruta.id);
          this.grupos.updateElement(grupo);
          this.mainMenu();
        } else {
          console.log("La ruta no existe");
          this.addRutaFavoritaGrupo(grupo);
        }
      });
  }
  eliminarGrupo(grupo: Grupo) {
    console.clear();
    inquirer
      .prompt([
        {
          type: "confirm",
          name: "confirmacion",
          message: "¿Estas seguro de que quiere eliminar el grupo?",
        },
      ])
      .then((answers) => {
        if (answers.confirmacion) {
          this.grupos.removeElement(grupo.id);
          this.mainMenu();
        } else {
          this.mainMenu();
        }
      });
  }
}
