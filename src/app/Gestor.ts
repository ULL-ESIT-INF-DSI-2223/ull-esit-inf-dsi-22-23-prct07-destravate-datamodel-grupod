import { getSourceMapRange } from "typescript";
import { Usuario } from "../datatypes/usuarios";
import { Ruta } from "../datatypes/rutas";
import { Reto } from "../datatypes/retos";
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
        } else if (answers["command"] === "Registrarse") {
          this.register();
        } else {
          const admin = new Admin();
          admin.mainMenu();
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
    console.log();
  }
}
