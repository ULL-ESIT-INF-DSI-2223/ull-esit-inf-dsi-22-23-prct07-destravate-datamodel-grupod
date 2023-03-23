import { Usuario } from "../datatypes/usuarios";
import { Grupo } from "../datatypes/grupos";
import { Stats } from "../datatypes/stats";
import inquirer from "inquirer";
import { UsuarioCollection } from "../collections/usuario_collection";
import { RutaCollection } from "../collections/rutas_collection";
import { RetoCollection } from "../collections/retos_collection";
import { GrupoCollection } from "../collections/grupos_collection";
import { JsonUsuarios } from "../jsonadapters/jsonusuarios";
import { JsonRutas } from "../jsonadapters/jsonrutas";
import { JsonRetos } from "../jsonadapters/jsonretos";
import { JsonGrupos } from "../jsonadapters/jsongrupos";
import { Admin } from "./Admin";

enum ComandosGestor {
  CerrarSesión = "Cerrar sesión",
  VerUsuarios = "Ver usuarios",
  GestionarAmigos = "Gestionar amigos",
  VerRutas = "Ver rutas",
  UnirseGrupo = "Unirse a un grupo",
  VerGrupos = "Ver grupos",
  GestionarGrupos = "Gestionar grupos",
}

export class Gestor {
  private usuarios: UsuarioCollection;
  private rutas: RutaCollection;
  private retos: RetoCollection;
  private grupos: GrupoCollection;
  private current_user: Usuario;

  public static instance: Gestor;

  public static getInstance(): Gestor {
    if (!Gestor.instance) {
      Gestor.instance = new Gestor();
    }
    return Gestor.instance;
  }

  private constructor() {
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

  public start(): void {
    console.clear();
    console.log("Bienvenido a DeStravaTe");
    inquirer
      .prompt([
        {
          type: "list",
          name: "command",
          message: "¿Que quieres hacer?",
          choices: [
            "Iniciar sesión",
            "Registrarse",
            "Modo Admin (Solo para desarrolladores)",
          ],
        },
      ])
      .then((answers) => {
        if (answers["command"] === "Iniciar sesión") {
          this.login();
          return;
        } else if (answers["command"] === "Registrarse") {
          this.register();
          return;
        } else {
          const admin = new Admin();
          admin.mainMenu();
          return;
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
          return;
        } else {
          this.errorLogin();
          return;
        }
      });
  }
  public errorLogin() {
    console.log("Usuario no encontrado");
    console.log();
    inquirer
      .prompt([
        {
          type: "list",
          name: "command",
          message: "¿Que quieres hacer?",
          choices: ["Volver a intentarlo", "Registrarse"],
        },
      ])
      .then((answers) => {
        if (answers["command"] === "Volver a intentarlo") {
          this.login();
          return;
        } else {
          this.register();
          return;
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
          this.errorRegistrarse();
          return;
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
          return;
        }
      });
  }

  public errorRegistrarse() {
    console.log("Usuario ya existente");
    console.log();
    inquirer
      .prompt([
        {
          type: "list",
          name: "command",
          message: "¿Que quieres hacer?",
          choices: ["Volver a intentarlo", "Iniciar sesión"],
        },
      ])
      .then((answers) => {
        if (answers["command"] === "Volver a intentarlo") {
          this.register();
        } else {
          this.login();
        }
      });
  }

  public mainMenu(): void {
    console.clear();
    console.log("Bienvenido " + this.current_user.nombre);
    inquirer
      .prompt([
        {
          type: "list",
          name: "command",
          message: "¿Que quieres hacer?",
          choices: Object.values(ComandosGestor),
        },
      ])
      .then((answers) => {
        switch (answers["command"]) {
          case ComandosGestor.CerrarSesión:
            this.start();
            break;
          case ComandosGestor.VerUsuarios:
            this.verUsuarios();
            break;
          case ComandosGestor.GestionarAmigos:
            this.gestionarAmigos();
            break;
          case ComandosGestor.VerRutas:
            this.verRutas();
            break;
          case ComandosGestor.UnirseGrupo:
            this.unirseGrupo();
            break;
          case ComandosGestor.VerGrupos:
            this.verGrupos();
            break;
          case ComandosGestor.GestionarGrupos:
            this.gestionarGrupos();
            break;
        }
      });
  }
  public verUsuarios() {
    console.clear();
    console.log("Usuarios");
    console.log();
    this.usuarios.forEach((user) => {
      console.log(user.nombre);
    });
    console.log();
    inquirer
      .prompt([
        {
          type: "list",
          name: "command",
          message: "¿Que quieres hacer?",
          choices: ["Volver al menú principal", "Gestionar amigos"],
        },
      ])
      .then((answers) => {
        if (answers["command"] === "Volver al menú principal") {
          this.mainMenu();
        } else {
          this.gestionarAmigos();
        }
      });
  }
  public gestionarAmigos() {
    console.clear();
    console.log("Gestionar amigos");
    console.log();
    inquirer
      .prompt([
        {
          type: "list",
          name: "command",
          message: "¿Que quieres hacer?",
          choices: [
            "Ver amigos",
            "Añadir amigo",
            "Eliminar amigo",
            "Volver al menú principal",
          ],
        },
      ])
      .then((answers) => {
        if (answers["command"] === "Añadir amigo") {
          this.addFriend();
        } else if (answers["command"] === "Eliminar amigo") {
          this.removeFriend();
        } else if (answers["command"] === "Ver amigos") {
          this.verAmigos();
        } else {
          this.mainMenu();
        }
      });
  }
  public addFriend() {
    console.clear();
    console.log("Añadir amigo");
    console.log();
    inquirer
      .prompt([
        {
          type: "input",
          name: "username",
          message: "Introduce el nombre de usuario del amigo",
        },
      ])
      .then((answers) => {
        const username = answers["username"];
        const user = this.usuarios.findElement(username);
        if (user !== undefined) {
          if (this.current_user.getAmigos().includes(user.id)) {
            console.log("Ya es tu amigo");
            this.gestionarAmigos();
            return;
          }
          if (user.id === this.current_user.id) {
            console.log("No puedes añadirte a ti mismo");
            this.gestionarAmigos();
            return;
          }
          this.current_user.addAmigo(user.id);
          console.log("Amigo añadido");
          this.usuarios.updateElement(this.current_user);
          this.gestionarAmigos();
        } else {
          console.log("Usuario no encontrado");
          this.addFriend();
        }
      });
  }
  public removeFriend() {
    console.clear();
    console.log("Eliminar amigo");
    console.log();
    inquirer
      .prompt([
        {
          type: "input",
          name: "username",
          message: "Introduce el nombre de usuario del amigo",
        },
      ])
      .then((answers) => {
        const username = answers["username"];
        const user = this.usuarios.findElement(username);
        if (user !== undefined) {
          this.current_user.removeAmigo(user.id);
          console.log("Amigo eliminado");
          this.usuarios.updateElement(this.current_user);
          this.gestionarAmigos();
        } else {
          console.log("Usuario no encontrado");
          this.removeFriend();
        }
      });
  }
  public verAmigos() {
    console.clear();
    console.log("Amigos");
    console.log();
    this.current_user.getAmigos().forEach((id) => {
      const user = this.usuarios.getElement(id);
      if (user !== undefined) {
        console.log(user.nombre);
      }
    });
    console.log();
    inquirer
      .prompt([
        {
          type: "list",
          name: "command",
          message: "¿Que quieres hacer?",
          choices: ["Volver al menú principal", "Gestionar amigos"],
        },
      ])
      .then((answers) => {
        if (answers["command"] === "Volver al menú principal") {
          this.mainMenu();
        } else {
          this.gestionarAmigos();
        }
      });
  }
  public verRutas() {
    console.clear();
    console.log("Rutas");
    console.log();
    const options = this.rutas.getNombres();
    options.push("Volver al menú principal");
    inquirer
      .prompt([
        {
          type: "list",
          name: "command",
          message: "Elija una ruta para ver sus detalles",
          choices: options,
        },
      ])
      .then((answers) => {
        if (answers["command"] === "Volver al menú principal") {
          this.mainMenu();
        } else {
          this.verRuta(answers["command"]);
        }
      });
  }
  public verRuta(nombre: string) {
    console.clear();
    console.log("Ruta");
    console.log();
    const ruta = this.rutas.findElement(nombre);
    if (ruta !== undefined) {
      console.log("Nombre: " + ruta.nombre);
      console.log("Geolocalización de inicio: " + ruta.getCoordenadasInicio());
      console.log("Geolocalización de fin: " + ruta.getCoordenadasFin());
      console.log("Longitud de la ruta: " + ruta.getDistancia() + " km");
      console.log("Desnivel medio de la ruta: " + ruta.getDesnivel() + " m");
      console.log("Usuarios que han realizado la ruta: ");
      ruta.getUsuarios().forEach((id) => {
        const user = this.usuarios.getElement(id);
        if (user !== undefined) {
          console.log(user.nombre);
        }
      });
      console.log("Tipo de actividad: " + ruta.getTipoRuta());
      console.log("Calificación media: " + ruta.getCalificacionMedia());
      console.log();
      inquirer
        .prompt([
          {
            type: "list",
            name: "command",
            message: "¿Que quieres hacer?",
            choices: ["Volver a ver rutas", "Volver al menú principal"],
          },
        ])
        .then((answers) => {
          if (answers["command"] === "Volver a ver rutas") {
            this.verRutas();
          } else {
            this.mainMenu();
          }
        });
    }
  }
  public unirseGrupo() {
    console.clear();
    console.log("Unirse a grupo");
    console.log();
    console.log(this.grupos.toString());
    inquirer
      .prompt([
        {
          type: "list",
          name: "nombre",
          message: "Elija un grupo para unirse",
          choices: this.grupos.getNombres(),
        },
      ])
      .then((answers) => {
        const nombre = answers["nombre"];
        const grupo = this.grupos.findElement(nombre);
        if (grupo !== undefined) {
          grupo.addMiembro(this.current_user.id);
          this.grupos.updateElement(grupo);
          console.log("Te has unido al grupo");
          this.mainMenu();
        } else {
          console.log("Grupo no encontrado");
          this.unirseGrupo();
        }
      });
  }
  public verGrupos() {
    console.clear();
    console.log("Grupos");
    console.log();
    this.grupos.forEach((grupo) => {
      console.log(grupo.nombre);
    });
    console.log();
    inquirer
      .prompt([
        {
          type: "list",
          name: "command",
          message: "¿Que quieres hacer?",
          choices: ["Volver al menú principal", "Gestionar grupos"],
        },
      ])
      .then((answers) => {
        if (answers["command"] === "Volver al menú principal") {
          this.mainMenu();
        } else {
          this.gestionarGrupos();
        }
      });
  }
  public gestionarGrupos() {
    console.clear();
    console.log("Gestionar grupos");
    console.log();
    console.log(this.current_user.toString());
    inquirer
      .prompt([
        {
          type: "list",
          name: "command",
          message: "¿Que quieres hacer?",
          choices: [
            "Crear grupo",
            "Eliminar grupo",
            "Volver al menú principal",
          ],
        },
      ])
      .then((answers) => {
        if (answers["command"] === "Crear grupo") {
          this.crearGrupo();
        } else if (answers["command"] === "Eliminar grupo") {
          this.eliminarGrupo();
        } else {
          this.mainMenu();
        }
      });
  }
  public crearGrupo() {
    console.clear();
    console.log("Crear grupo");
    console.log();
    inquirer
      .prompt([
        {
          type: "input",
          name: "nombre",
          message: "Introduce el nombre del grupo",
        },
      ])
      .then((answers) => {
        const nombre = answers["nombre"];
        const grupo = new Grupo(
          nombre,
          [this.current_user.id],
          new Stats(),
          [this.current_user.id],
          [],
          [],
          this.current_user.id
        );
        grupo.addMiembro(this.current_user.id);
        this.grupos.addElement(grupo);
        console.log("Grupo creado");
        this.mainMenu();
      });
  }
  public eliminarGrupo() {
    console.clear();
    console.log("Eliminar grupo");
    console.log();
    console.log(this.grupos.toString());
    const options = this.grupos.getNombres();
    options.push("Volver al menú principal");
    inquirer
      .prompt([
        {
          type: "list",
          name: "nombre",
          message: "Elija un grupo para eliminar",
          choices: this.grupos.getNombres(),
        },
      ])
      .then((answers) => {
        if (answers["nombre"] === "Volver al menú principal") {
          this.gestionarGrupos();
        }
        const nombre = answers["nombre"];
        const grupo = this.grupos.findElement(nombre);
        if (grupo === undefined) {
          console.log("Grupo no encontrado");
          this.eliminarGrupo();
        } else if (grupo.getOwner() !== this.current_user.id) {
          this.grupos.removeElement(grupo.id);
          console.log("Grupo eliminado");
          this.gestionarGrupos();
        } else {
          console.log("No puedes eliminar un grupo que no te pertenece");
          this.gestionarGrupos();
        }
      });
  }
}
