import { Usuario } from "../datatypes/usuarios";
import { Grupo } from "../datatypes/grupos";
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
/**
 * Enumerado de los comandos que puede ejecutar el gestor
 */
enum ComandosGestor {
  VerUsuarios = "Ver usuarios",
  VerRutas = "Ver rutas",
  VerGrupos = "Ver grupos",
  UnirseGrupo = "Unirse a un grupo",
  GestionarAmigos = "Gestionar amigos",
  GestionarGrupos = "Gestionar grupos",
  CerrarSesión = "Cerrar sesión",
}
/**
 * Clase que representa el gestor de la aplicación
 */
export class Gestor {
  private usuarios: UsuarioCollection;
  private rutas: RutaCollection;
  private retos: RetoCollection;
  private grupos: GrupoCollection;
  private current_user: Usuario;

  public static instance: Gestor;
  /**
   * Obtiene la instancia de la clase Gestor
   * @returns La instancia de la clase Gestor
   */
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
      {
        km_anio: 0,
        km_mes: 0,
        km_semana: 0,
        desnivel_anio: 0,
        desnivel_mes: 0,
        desnivel_semana: 0,
      },
      [],
      [],
      []
    );
  }
  /**
   * Inicia la aplicación
   */
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
          const admin = Admin.getInstance();
          admin.mainMenu();
          return;
        }
      });
  }
  /**
   * Inicia sesión
   */
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
  /**
   * Error al iniciar sesión
   */
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
  /**
   * Registra un usuario
   */
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
            {
              km_anio: 0,
              km_mes: 0,
              km_semana: 0,
              desnivel_anio: 0,
              desnivel_mes: 0,
              desnivel_semana: 0,
            },
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
  /**
   * Error al registrar un usuario
   */
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
  /**
   * Muestra el menú principal
   */
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
  /**
   * Menú para ver los usuarios
   */
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
  /**
   * Menú para gestionar los amigos
   */
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
  /**
   * Menú para añadir un amigo
   */
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
  /**
   * Menú para eliminar un amigo
   */
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
  /**
   * Menú para ver los amigos
   */
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
  /**
   * Menú para ver las rutas
   */
  public verRutas() {
    console.clear();
    console.log("Rutas");
    console.log();
    const options = this.rutas.getAllElements().map((ruta) => ruta.nombre);
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
  /**
   * Ver los detalles de una ruta
   * @param nombre Nombre de la ruta
   */
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
  /**
   * Menú para unirse a un grupo
   */
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
          choices: this.grupos.getAllElements().map((grupo) => grupo.nombre),
        },
      ])
      .then((answers) => {
        const nombre = answers["nombre"];
        const grupo = this.grupos.findElement(nombre);
        if (grupo !== undefined) {
          if (grupo.getMiembros().includes(this.current_user.id)) {
            console.log("Ya eres miembro de este grupo");
            this.mainMenu();
            return;
          }
          grupo.addMiembro(this.current_user);
          this.grupos.updateElement(grupo);
          console.log("Te has unido al grupo");
          this.mainMenu();
        } else {
          console.log("Grupo no encontrado");
          this.unirseGrupo();
        }
      });
  }
  /**
   * Menú para ver los grupos
   */
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
  /**
   * Menú para gestionar los grupos
   */
  public gestionarGrupos() {
    console.clear();
    console.log("Gestionar grupos");
    console.log();
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
  /**
   * Menú para crear un grupo
   */
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
          {
            km_anio: 0,
            km_mes: 0,
            km_semana: 0,
            desnivel_anio: 0,
            desnivel_mes: 0,
            desnivel_semana: 0,
          },
          [this.current_user],
          [],
          [],
          this.current_user.id
        );
        grupo.addMiembro(this.current_user);
        this.grupos.addElement(grupo);
        console.log("Grupo creado");
        this.mainMenu();
      });
  }
  /**
   * Menú para eliminar un grupo
   */
  public eliminarGrupo() {
    console.clear();
    console.log("Eliminar grupo");
    console.log();
    console.log(this.grupos.toString());
    const options = this.grupos.getAllElements().map((grupo) => grupo.nombre);
    options.push("Volver al menú principal");
    inquirer
      .prompt([
        {
          type: "list",
          name: "nombre",
          message: "Elija un grupo para eliminar",
          choices: this.grupos.getAllElements().map((grupo) => grupo.nombre),
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
