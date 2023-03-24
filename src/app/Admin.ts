import { Usuario } from "../datatypes/usuarios";
import { Ruta } from "../datatypes/rutas";
import { Reto } from "../datatypes/retos";
import { Grupo } from "../datatypes/grupos";
import { UsuarioCollection } from "../collections/usuario_collection";
import { RutaCollection } from "../collections/rutas_collection";
import { RetoCollection } from "../collections/retos_collection";
import { GrupoCollection } from "../collections/grupos_collection";
import inquirer from "inquirer";
import { JsonUsuarios } from "../jsonadapters/jsonusuarios";
import { JsonGrupos } from "../jsonadapters/jsongrupos";
import { JsonRutas } from "../jsonadapters/jsonrutas";
import { JsonRetos } from "../jsonadapters/jsonretos";
import { Gestor } from "./Gestor";
import readline from "readline";

type MyFunctionType = () => void;
/**
 * Enumerado de los comandos
 */
enum Commandos {
  MostrarUsuarios = "Mostrar usuarios",
  MostrarRutas = "Mostrar rutas",
  MostrarRetos = "Mostrar retos",
  MostrarGrupos = "Mostrar grupos",
  CrearUsuario = "Crear un usuario",
  CrearRuta = "Crear una ruta",
  CrearReto = "Crear un reto",
  CrearGrupo = "Crear un grupo",
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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
/**
 * Clase Admin
 */
export class Admin {
  private usuarios: UsuarioCollection;
  private rutas: RutaCollection;
  private retos: RetoCollection;
  private grupos: GrupoCollection;
  private current_user: Usuario;
  /**
   * Obtiene la instancia de la clase Admin
   * @returns instancia de la clase Admin
   */
  public static getInstance(): Admin {
    if (!Admin.instance) {
      Admin.instance = new Admin();
    }
    return Admin.instance;
  }
  private static instance: Admin;

  private constructor() {
    this.usuarios = new JsonUsuarios();
    this.rutas = new JsonRutas();
    this.retos = new JsonRetos();
    this.grupos = new JsonGrupos();
    this.current_user = new Usuario(
      "admin",
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
   * Vuelve a la funcion que se le pasa
   * @param fn Funcion a la que se vuelve
   */
  volver(fn: MyFunctionType): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "command",
          message: "¿Que quieres hacer?",
          choices: ["Volver al menu anterior", "Volver al menu principal"],
        },
      ])
      .then((answers) => {
        switch (answers["command"]) {
          case "Volver al menu anterior":
            fn();
            break;
          case "Volver al menu principal":
            this.mainMenu();
            break;
        }
      });
  }
  /**
   * Cambia a los usuarios que se le pasan
   * @param usuarios Usuarios a cambiar
   */
  setUsuarios(usuarios: UsuarioCollection): void {
    this.usuarios = usuarios;
  }
  /**
   * Cambia a las rutas que se le pasan
   * @param rutas Rutas a cambiar
   */
  setRutas(rutas: RutaCollection): void {
    this.rutas = rutas;
  }
  /**
   * Cambia a los retos que se le pasan
   * @param retos Retos a cambiar
   */
  setRetos(retos: RetoCollection): void {
    this.retos = retos;
  }
  /**
   * Cambia a los grupos que se le pasan
   * @param grupos Grupos a cambiar
   */
  setGrupos(grupos: GrupoCollection): void {
    this.grupos = grupos;
  }
  /**
   * Menú principal
   */
  mainMenu(): void {
    console.clear();
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

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
          case Commandos.Salir: {
            console.log("Hasta luego!");
            const gestor = Gestor.getInstance();
            gestor.start();
            break;
          }
        }
      });
  }
  /**
   * Menú de crear usuario
   */
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
              )
            );
            this.mainMenu();
          }
        }
      });
  }
  /**
   * Menú de crear grupo
   */
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
                [],
                this.current_user.id
              )
            );
            this.mainMenu();
          }
        }
      });
  }
  /**
   * Menú de crear ruta
   */
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
          type: "list",
          name: "tipo_ruta",
          message: "Introduce el tipo de ruta",
          choices: ["correr", "bicicleta"],
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
  /**
   * Menú de crear reto
   */
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
          type: "list",
          name: "tipo_reto",
          message: "Introduce el tipo de reto",
          choices: ["correr", "bicicleta"],
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
  /**
   * Menú de modificar usuario
   */
  modificarUsuario() {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "usuario",
          message: "¿Que usuario desea modificar?",
          choices: this.usuarios
            .getAllElements()
            .map((usuario) => usuario.nombre),
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
                  "Salir",
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
                case "Salir":
                  this.mainMenu();
              }
            });
        }
      });
  }
  /**
   * Menú de cambiar nombre de usuario
   * @param usuario Usuario a modificar
   */
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
  /**
   * Menú de cambiar actividad de usuario
   * @param usuario Usuario a modificar
   */
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
        this.usuarios.updateElement(usuario);
        this.mainMenu();
      });
  }
  /**
   * Menú de añadir amigo a usuario
   * @param usuario Usuario a modificar
   */
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
  /**
   * Menú de añadir ruta favorita a usuario
   * @param usuario Usuario a modificar
   */
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
  /**
   * Menú de añadir reto a usuario
   * @param usuario Usuario a modificar
   */
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
  /**
   * Menú de añadir rutas a usuario
   * @param usuario Usuario a modificar
   */
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
  /**
   * Menú de modificar retos
   */
  modificarReto(): void {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "retos",
          message: "¿Que reto quieres modificar?",
          choices: this.retos.getAllElements().map((reto) => reto.nombre),
        },
      ])
      .then((answers) => {
        const reto = this.retos.findElement(answers.retos);
        if (reto != undefined) {
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
                case "Tipo de reto":
                  this.modificarTipoReto(reto);
                  break;
                case "Km totales":
                  this.modificarKmTotalesReto(reto);
                  break;
                case "Usuarios realizando el reto":
                  this.modificarUsuariosRealizandoReto(reto);
                  break;
                case "Rutas del reto":
                  this.modificarRutasReto(reto);
                  break;
              }
            });
        } else {
          console.log("El reto no existe");
          this.modificarReto();
        }
      });
  }
  /**
   * Menú de cambiar nombre de reto
   * @param reto Reto a modificar
   */
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
        this.retos.updateElement(reto);
        console.log("Nombre modificado correctamente");
      });
  }
  /**
   * Menú de cambiar tipo de reto
   * @param reto Reto a modificar
   */
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
        this.retos.updateElement(reto);
        console.log("Tipo de reto modificado correctamente");
      });
  }
  /**
   * Menú de cambiar km totales de reto
   * @param reto Reto a modificar
   */
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
        this.retos.updateElement(reto);
        console.log("Km totales modificados correctamente");
      });
  }
  /**
   * Menú de cambiar usuarios realizando reto
   * @param reto Reto a modificar
   */
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
        this.retos.updateElement(reto);
        console.log("Usuarios realizando el reto modificados correctamente");
      });
  }
  /**
   * Menú de cambiar rutas de reto
   * @param reto Reto a modificar
   */
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
        this.retos.updateElement(reto);
        console.log("Rutas modificadas correctamente");
      });
  }
  /**
   * Menú de modificar grupos
   */
  modificarGrupo() {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "grupo",
          message: "¿Que grupo quieres modificar?",
          choices: this.grupos.getAllElements().map((grupo) => grupo.nombre),
        },
      ])
      .then((answers) => {
        const grupo = this.grupos.findElement(answers.grupo);
        if (grupo != undefined) {
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
                  "Salir",
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
                case "Salir":
                  this.mainMenu();
                  break;
              }
            });
        }
      });
  }
  /**
   * Menú de cambiar nombre de grupo
   * @param grupo Grupo a modificar
   */
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
  /**
   * Menú de añadir miembro a grupo
   * @param grupo Grupo a modificar
   */
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
  /**
   * Menú de añadir ruta favorita a grupo
   * @param grupo Grupo a modificar
   */
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
  /**
   * Menú de modificar rutas
   */
  modificarRuta() {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "ruta",
          message: "¿Que ruta quieres modificar?",
          choices: this.rutas.getAllElements().map((ruta) => ruta.nombre),
        },
      ])
      .then((answers) => {
        const ruta = this.rutas.findElement(answers.ruta);
        if (ruta != undefined) {
          inquirer
            .prompt([
              {
                type: "list",
                name: "actividad",
                message: "¿Que desea hacer?",
                choices: [
                  "Cambiar nombre",
                  "Cambiar distancia",
                  "Cambiar desnivel",
                  "Cambiar tipo",
                  "Salir",
                ],
              },
            ])
            .then((answers) => {
              switch (answers.actividad) {
                case "Cambiar nombre":
                  this.cambiarNombreRuta(ruta);
                  break;
                case "Cambiar distancia":
                  this.cambiarDistanciaRuta(ruta);
                  break;
                case "Cambiar desnivel":
                  this.cambiarDesnivelRuta(ruta);
                  break;
                case "Cambiar tipo":
                  this.cambiarTipoRuta(ruta);
                  break;
                case "Salir":
                  this.mainMenu();
                  break;
              }
            });
        }
      });
  }
  /**
   * Menú de cambiar nombre de ruta
   * @param ruta Ruta a modificar
   */
  cambiarNombreRuta(ruta: Ruta) {
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
          this.cambiarNombreRuta(ruta);
        } else {
          const ruta2 = this.rutas.findElement(answers.nombre);
          if (ruta2 != undefined) {
            console.log("El nombre ya existe");
            this.cambiarNombreRuta(ruta);
          } else {
            ruta.cambiarNombre(answers.nombre);
            this.rutas.updateElement(ruta);
            this.mainMenu();
          }
        }
      });
  }
  /**
   * Menú de cambiar distancia de ruta
   * @param ruta Ruta a modificar
   */
  cambiarDistanciaRuta(ruta: Ruta) {
    console.clear();
    inquirer
      .prompt([
        {
          type: "input",
          name: "distancia",
          message: "Introduce la nueva distancia",
        },
      ])
      .then((answers) => {
        if (answers.distancia == "" || answers.distancia.parseInt() < 0) {
          console.log(
            "Error al cambiar la distancia, distancia vacia o negativa"
          );
          this.cambiarDistanciaRuta(ruta);
        } else {
          ruta.cambiarDistancia(answers.distancia);
          this.rutas.updateElement(ruta);
          this.mainMenu();
        }
      });
  }
  /**
   * Menú de cambiar desnivel de ruta
   * @param ruta Ruta a modificar
   */
  cambiarDesnivelRuta(ruta: Ruta) {
    console.clear();
    inquirer
      .prompt([
        {
          type: "input",
          name: "desnivel",
          message: "Introduce el nueva desnivel",
        },
      ])
      .then((answers) => {
        if (answers.desnivel == "" || answers.desnivel.parseInt() < 0) {
          console.log(
            "Error al cambiar la desnivel, desnivel vacio o negativo"
          );
          this.cambiarDesnivelRuta(ruta);
        } else {
          ruta.cambiarDesnivel(answers.desnivel);
          this.rutas.updateElement(ruta);
          this.mainMenu();
        }
      });
  }
  /**
   * Menú de cambiar tipo de ruta
   * @param ruta Ruta a modificar
   */
  cambiarTipoRuta(ruta: Ruta) {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "tipo",
          message: "Introduce el nuevo tipo",
          choices: ["Circular", "Lineal"],
        },
      ])
      .then((answers) => {
        ruta.cambiarTipoRuta(answers.tipo);
        this.rutas.updateElement(ruta);
        this.mainMenu();
      });
  }
  /**
   * Menú de eliminar usuarios
   */
  eliminarUsuario(): void {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "usuarios",
          message: "¿Que usuario quieres eliminar?",
          choices: this.usuarios
            .getAllElements()
            .map((usuario) => usuario.nombre),
        },
      ])
      .then((answers) => {
        this.usuarios.removeElement(answers.usuarios);
        console.log("Usuario eliminado correctamente");
        this.mainMenu();
      });
  }
  /**
   * Menú de eliminar retos
   */
  eliminarReto(): void {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "retos",
          message: "¿Que reto quieres eliminar?",
          choices: this.retos.getAllElements().map((reto) => reto.nombre),
        },
      ])
      .then((answers) => {
        this.retos.removeElement(answers.retos);
        console.log("Reto eliminado correctamente");
        this.mainMenu();
      });
  }
  /**
   * Menú de eliminar rutas
   */
  eliminarRuta(): void {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "rutas",
          message: "¿Que ruta quieres eliminar?",
          choices: this.rutas.getAllElements().map((ruta) => ruta.nombre),
        },
      ])
      .then((answers) => {
        this.rutas.removeElement(answers.rutas);
        console.log("Ruta eliminada correctamente");
        this.mainMenu();
      });
  }
  /**
   * Menú de eliminar grupos
   */
  eliminarGrupo(): void {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "grupos",
          message: "¿Que grupo quieres eliminar?",
          choices: this.grupos.getAllElements().map((grupo) => grupo.nombre),
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
      });
  }
  /**
   * Menú de mostrar rutas
   */
  mostrarRutas(): void {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "rutas",
          message: "¿Como quieres ver la lista de rutas?",
          choices: [
            "Mostrar todas las rutas por orden alfabético ascedente",
            "Mostrar todas las rutas por orden alfabético descendente",
            "Mostrar todas las rutas por cantidad de usuarios ascendente",
            "Mostrar todas las rutas por cantidad de usuarios descendente",
            "Mostrar todas las rutas por distancia ascendente",
            "Mostrar todas las rutas por distancia descendente",
            "Mostrar todas las rutas por calificacion media ascendente",
            "Mostrar todas las rutas por calificacion media descendente",
            "Mostrar todas las rutas de correr",
            "Mostrar todas las rutas de bicicleta",
            "Volver al menu principal",
          ],
        },
      ])
      .then((answers) => {
        switch (answers.rutas) {
          case "Mostrar todas las rutas por orden alfabético ascedente":
            this.mostrarRutasAlfabeticamenteAscendente();
            break;
          case "Mostrar todas las rutas por orden alfabético descendente":
            this.mostrarRutasAlfabeticamenteDescendente();
            break;
          case "Mostrar todas las rutas por cantidad de usuarios ascendente":
            this.mostrarRutasCantidadUsuariosAscendente();
            break;
          case "Mostrar todas las rutas por cantidad de usuarios descendente":
            this.mostrarRutasCantidadUsuariosDescendente();
            break;
          case "Mostrar todas las rutas por distancia ascendente":
            this.mostrarRutasDistanciaAscendente();
            break;
          case "Mostrar todas las rutas por distancia descendente":
            this.mostrarRutasDistanciaDescendente();
            break;
          case "Mostrar todas las rutas por calificacion media ascendente":
            this.mostrarRutasCalificacionAscendente();
            break;
          case "Mostrar todas las rutas por calificacion media descendente":
            this.mostrarRutasCalificacionDescendente();
            break;
          case "Mostrar todas las rutas de correr":
            this.mostrarRutasCorrer();
            break;
          case "Mostrar todas las rutas de bicicleta":
            this.mostrarRutasBicicleta();
            break;
          case "Volver al menu principal":
            this.mainMenu();
            break;
        }
      });
  }
  /**
   * Mostrar rutas alfabeticamente ascendente
   */
  mostrarRutasAlfabeticamenteAscendente(): void {
    console.clear();
    const rutas = this.rutas.getAllElements();
    rutas.sort((a, b) =>
      a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase())
    );
    for (let i = 0; i < rutas.length; i++) {
      console.log(rutas[i].nombre);
    }
    this.volver(this.mostrarRutas.bind(this));
  }
  /**
   * Mostrar rutas alfabeticamente descendente
   */
  mostrarRutasAlfabeticamenteDescendente(): void {
    console.clear();
    const rutas = this.rutas.getAllElements();
    rutas.sort((a, b) =>
      b.nombre.toLowerCase().localeCompare(a.nombre.toLowerCase())
    );
    for (let i = 0; i < rutas.length; i++) {
      console.log(rutas[i]);
    }
    this.volver(this.mostrarRutas.bind(this));
  }
  /**
   * Mostrar rutas por cantidad de usuarios ascendente
   */
  mostrarRutasCantidadUsuariosAscendente(): void {
    console.clear();
    const rutas = this.rutas.getAllElements();
    rutas.sort((a, b) => a.getUsuarios().length - b.getUsuarios().length);
    for (let i = 0; i < rutas.length; i++) {
      console.log(rutas[i].nombre + " " + rutas[i].getUsuarios().length);
    }
    this.volver(this.mostrarRutas.bind(this));
  }
  /**
   * Mostrar rutas por cantidad de usuarios descendente
   */
  mostrarRutasCantidadUsuariosDescendente(): void {
    console.clear();
    const rutas = this.rutas.getAllElements();
    rutas.sort((a, b) => b.getUsuarios().length - a.getUsuarios().length);
    for (let i = 0; i < rutas.length; i++) {
      console.log(rutas[i].nombre + " " + rutas[i].getUsuarios().length);
    }
    this.volver(this.mostrarRutas.bind(this));
  }
  /**
   * Mostrar rutas por distancia ascendente
   */
  mostrarRutasDistanciaAscendente(): void {
    console.clear();
    const rutas = this.rutas.getAllElements();
    rutas.sort((a, b) => a.getDistancia() - b.getDistancia());
    for (let i = 0; i < rutas.length; i++) {
      console.log(rutas[i].nombre + " " + rutas[i].getDistancia());
    }
    this.volver(this.mostrarRutas.bind(this));
  }
  /**
   * Mostrar rutas por distancia descendente
   */
  mostrarRutasDistanciaDescendente(): void {
    console.clear();
    const rutas = this.rutas.getAllElements();
    rutas.sort((a, b) => b.getDistancia() - a.getDistancia());
    for (let i = 0; i < rutas.length; i++) {
      console.log(rutas[i].nombre + " " + rutas[i].getDistancia());
    }
    this.volver(this.mostrarRutas.bind(this));
  }
  /**
   * Mostrar rutas por calificacion media ascendente
   */
  mostrarRutasCalificacionAscendente(): void {
    console.clear();
    const rutas = this.rutas.getAllElements();
    rutas.sort((a, b) => a.getCalificacionMedia() - b.getCalificacionMedia());
    for (let i = 0; i < rutas.length; i++) {
      console.log(
        rutas[i].nombre + " " + rutas[i].getCalificacionMedia().toFixed(2)
      );
    }
    this.volver(this.mostrarRutas.bind(this));
  }
  /**
   * Mostrar rutas por calificacion media descendente
   */
  mostrarRutasCalificacionDescendente(): void {
    console.clear();
    const rutas = this.rutas.getAllElements();
    rutas.sort((a, b) => b.getCalificacionMedia() - a.getCalificacionMedia());
    for (let i = 0; i < rutas.length; i++) {
      console.log(
        rutas[i].nombre + " " + rutas[i].getCalificacionMedia().toFixed(2)
      );
    }
    this.volver(this.mostrarRutas.bind(this));
  }
  /**
   * Mostrar rutas de correr
   */
  mostrarRutasCorrer(): void {
    console.clear();
    const rutas = this.rutas.getAllElements();
    const rutasCorrer = rutas.filter((ruta) => ruta.getTipoRuta() === "correr");
    for (let i = 0; i < rutasCorrer.length; i++) {
      console.log(rutasCorrer[i].nombre + ": " + rutasCorrer[i].getTipoRuta());
    }
    this.volver(this.mostrarRutas.bind(this));
  }
  /**
   * Mostrar rutas de bicicleta
   */
  mostrarRutasBicicleta(): void {
    console.clear();
    const rutas = this.rutas.getAllElements();
    const rutasBicicleta = rutas.filter(
      (ruta) => ruta.getTipoRuta() === "bicicleta"
    );
    for (let i = 0; i < rutasBicicleta.length; i++) {
      console.log(
        rutasBicicleta[i].nombre + ": " + rutasBicicleta[i].getTipoRuta()
      );
    }
    this.volver(this.mostrarRutas.bind(this));
  }
  /**
   * Menú de mostra usuarios
   */
  mostrarUsuarios(): void {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "usuarios",
          message: "¿Qué quieres hacer?",
          choices: [
            "Mostrar todos los usuarios por orden alfabético ascedente",
            "Mostrar todos los usuarios por orden alfabético descendente",
            "Mostrar todos los usuarios por cantidad de Km realizados semana actual ascendente",
            "Mostrar todos los usuarios por cantidad de Km realizados semana actual descendente",
            "Mostrar todos los usuarios por cantidad de Km realizados mes actual ascendente",
            "Mostrar todos los usuarios por cantidad de Km realizados mes actual descendente",
            "Mostrar todos los usuarios por cantidad de Km realizados año actual ascendente",
            "Mostrar todos los usuarios por cantidad de Km realizados año actual descendente",
            "Volver al menu principal",
          ],
        },
      ])
      .then((answers) => {
        switch (answers.usuarios) {
          case "Mostrar todos los usuarios por orden alfabético ascedente":
            this.mostrarUsuariosAlfabeticamenteAscendente();
            break;
          case "Mostrar todos los usuarios por orden alfabético descendente":
            this.mostrarUsuariosAlfabeticamenteDescendente();
            break;
          case "Mostrar todos los usuarios por cantidad de Km realizados semana actual ascendente":
            this.mostrarUsuariosKmSemanaAscendente();
            break;
          case "Mostrar todos los usuarios por cantidad de Km realizados semana actual descendente":
            this.mostrarUsuariosKmSemanaDescendente();
            break;
          case "Mostrar todos los usuarios por cantidad de Km realizados mes actual ascendente":
            this.mostrarUsuariosKmMesAscendente();
            break;
          case "Mostrar todos los usuarios por cantidad de Km realizados mes actual descendente":
            this.mostrarUsuariosKmMesDescendente();
            break;
          case "Mostrar todos los usuarios por cantidad de Km realizados año actual ascendente":
            this.mostrarUsuariosKmAñoAscendente();
            break;
          case "Mostrar todos los usuarios por cantidad de Km realizados año actual descendente":
            this.mostrarUsuariosKmAñoDescendente();
            break;
          case "Volver al menu principal":
            this.mainMenu();
            break;
        }
      });
  }
  /**
   * Mostrar usuarios por orden alfabético ascendente
   */
  mostrarUsuariosAlfabeticamenteAscendente(): void {
    console.clear();
    const usuarios = this.usuarios.getAllElements();
    usuarios.sort((a, b) =>
      a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase())
    );
    for (let i = 0; i < usuarios.length; i++) {
      console.log(usuarios[i].nombre);
    }
    this.volver(this.mostrarRutas.bind(this));
  }
  /**
   * Mostrar usuarios por orden alfabético descendente
   */
  mostrarUsuariosAlfabeticamenteDescendente(): void {
    console.clear();
    const usuarios = this.usuarios.getAllElements();
    usuarios.sort((a, b) =>
      b.nombre.toLowerCase().localeCompare(a.nombre.toLowerCase())
    );
    for (let i = 0; i < usuarios.length; i++) {
      console.log(usuarios[i].nombre);
    }
    this.volver(this.mostrarRutas.bind(this));
  }
  /**
   * Mostrar usuarios por cantidad de Km realizados semana actual ascendente
   */
  mostrarUsuariosKmSemanaAscendente(): void {
    console.clear();
    const usuarios = this.usuarios.getAllElements();
    usuarios.sort(
      (a, b) => a.getKmRecorridosSemana() - b.getKmRecorridosSemana()
    );
    for (let i = 0; i < usuarios.length; i++) {
      console.log(
        usuarios[i].nombre + " " + usuarios[i].getKmRecorridosSemana()
      );
    }
    this.volver(this.mostrarRutas.bind(this));
  }
  /**
   * Mostrar usuarios por cantidad de Km realizados semana actual descendente
   */
  mostrarUsuariosKmSemanaDescendente(): void {
    console.clear();
    const usuarios = this.usuarios.getAllElements();
    usuarios.sort(
      (a, b) => b.getKmRecorridosSemana() - a.getKmRecorridosSemana()
    );
    for (let i = 0; i < usuarios.length; i++) {
      console.log(
        usuarios[i].nombre + " " + usuarios[i].getKmRecorridosSemana()
      );
    }
    this.volver(this.mostrarRutas.bind(this));
  }
  /**
   * Mostrar usuarios por cantidad de Km realizados mes actual ascendente
   */
  mostrarUsuariosKmMesAscendente(): void {
    console.clear();
    const usuarios = this.usuarios.getAllElements();
    usuarios.sort((a, b) => a.getKmRecorridosMes() - b.getKmRecorridosMes());
    for (let i = 0; i < usuarios.length; i++) {
      console.log(usuarios[i].nombre + " " + usuarios[i].getKmRecorridosMes());
    }
    this.volver(this.mostrarRutas.bind(this));
  }
  /**
   * Mostrar usuarios por cantidad de Km realizados mes actual descendente
   */
  mostrarUsuariosKmMesDescendente(): void {
    console.clear();
    const usuarios = this.usuarios.getAllElements();
    usuarios.sort((a, b) => b.getKmRecorridosMes() - a.getKmRecorridosMes());
    for (let i = 0; i < usuarios.length; i++) {
      console.log(usuarios[i].nombre + " " + usuarios[i].getKmRecorridosMes());
    }
    this.volver(this.mostrarRutas.bind(this));
  }
  /**
   * Mostrar usuarios por cantidad de Km realizados año actual ascendente
   */
  mostrarUsuariosKmAñoAscendente(): void {
    console.clear();
    const usuarios = this.usuarios.getAllElements();
    usuarios.sort((a, b) => a.getKmRecorridosAnio() - b.getKmRecorridosAnio());
    for (let i = 0; i < usuarios.length; i++) {
      console.log(usuarios[i].nombre + " " + usuarios[i].getKmRecorridosAnio());
    }
    this.volver(this.mostrarRutas.bind(this));
  }
  /**
   * Mostrar usuarios por cantidad de Km realizados año actual descendente
   */
  mostrarUsuariosKmAñoDescendente(): void {
    console.clear();
    const usuarios = this.usuarios.getAllElements();
    usuarios.sort((a, b) => b.getKmRecorridosAnio() - a.getKmRecorridosAnio());
    for (let i = 0; i < usuarios.length; i++) {
      console.log(usuarios[i].nombre + " " + usuarios[i].getKmRecorridosAnio());
    }
    this.volver(this.mostrarRutas.bind(this));
  }
  /**
   * Menú de mostrar retos
   */
  mostrarRetos(): void {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "retos",
          message: "¿Qué quieres hacer?",
          choices: [
            "Mostrar todos los retos por orden alfabético ascedente",
            "Mostrar todos los retos por orden alfabético descendente",
            "Mostrar todos los retos por cantidad de Km a realizar ascendente",
            "Mostrar todos los retos por cantidad de Km a realizar descendente",
            "Mostrar todos los retos por cantidad de usarios participantes ascendente",
            "Mostrar todos los retos por cantidad de usarios participantes descendente",
            "Volver al menu principal",
          ],
        },
      ])
      .then((answers) => {
        switch (answers.retos) {
          case "Mostrar todos los retos por orden alfabético ascedente":
            this.mostrarRetosAlfabeticamenteAscendente();
            break;
          case "Mostrar todos los retos por orden alfabético descendente":
            this.mostrarRetosAlfabeticamenteDescendente();
            break;
          case "Mostrar todos los retos por cantidad de Km a realizar ascendente":
            this.mostrarRetosKmAscendente();
            break;
          case "Mostrar todos los retos por cantidad de Km a realizar descendente":
            this.mostrarRetosKmDescendente();
            break;
          case "Mostrar todos los retos por cantidad de usarios participantes ascendente":
            this.mostrarRetosUsuariosAscendente();
            break;
          case "Mostrar todos los retos por cantidad de usarios participantes descendente":
            this.mostrarRetosUsuariosDescendente();
            break;
          case "Volver al menu principal":
            this.mainMenu();
            break;
        }
      });
  }
  /**
   * Mostrar retos por cantidad de Km a realizar ascendente
   */
  mostrarRetosAlfabeticamenteAscendente(): void {
    console.clear();
    const retos = this.retos.getAllElements();
    retos.sort((a, b) =>
      a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase())
    );
    for (let i = 0; i < retos.length; i++) {
      console.log(retos[i].nombre);
    }
    this.volver(this.mostrarRutas.bind(this));
  }
  /**
   * Mostrar retos por cantidad de Km a realizar descendente
   */
  mostrarRetosAlfabeticamenteDescendente(): void {
    console.clear();
    const retos = this.retos.getAllElements();
    retos.sort((a, b) =>
      b.nombre.toLowerCase().localeCompare(a.nombre.toLowerCase())
    );
    for (let i = 0; i < retos.length; i++) {
      console.log(retos[i].nombre);
    }
    this.volver(this.mostrarRutas.bind(this));
  }
  /**
   * Mostrar retos por cantidad de Km a realizar ascendente
   */
  mostrarRetosKmAscendente(): void {
    console.clear();
    const retos = this.retos.getAllElements();
    retos.sort((a, b) => a.getKmTotales() - b.getKmTotales());
    for (let i = 0; i < retos.length; i++) {
      console.log(retos[i].nombre + " " + retos[i].getKmTotales());
    }
  }
  /**
   * Mostrar retos por cantidad de Km a realizar descendente
   */
  mostrarRetosKmDescendente(): void {
    console.clear();
    const retos = this.retos.getAllElements();
    retos.sort((a, b) => b.getKmTotales() - a.getKmTotales());
    for (let i = 0; i < retos.length; i++) {
      console.log(retos[i].nombre + " " + retos[i].getKmTotales());
    }
    this.volver(this.mostrarRutas.bind(this));
  }
  /**
   * Mostrar retos por cantidad de usuarios participantes ascendente
   */
  mostrarRetosUsuariosAscendente(): void {
    console.clear();
    const retos = this.retos.getAllElements();
    retos.sort(
      (a, b) =>
        a.getUsuariosRealizandoReto().length -
        b.getUsuariosRealizandoReto().length
    );
    for (let i = 0; i < retos.length; i++) {
      console.log(
        retos[i].nombre +
          " " +
          retos[i].getUsuariosRealizandoReto().length +
          " usuarios"
      );
    }
    this.volver(this.mostrarRutas.bind(this));
  }
  /**
   * Mostrar retos por cantidad de usuarios participantes descendente
   */
  mostrarRetosUsuariosDescendente(): void {
    console.clear();
    const retos = this.retos.getAllElements();
    retos.sort(
      (a, b) =>
        b.getUsuariosRealizandoReto().length -
        a.getUsuariosRealizandoReto().length
    );
    for (let i = 0; i < retos.length; i++) {
      console.log(
        retos[i].nombre +
          " " +
          retos[i].getUsuariosRealizandoReto().length +
          " usuarios"
      );
    }
    this.volver(this.mostrarRutas.bind(this));
  }
  /**
   * Menú de mostrar grupos
   */
  mostrarGrupos(): void {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "grupos",
          message: "¿Qué quieres hacer?",
          choices: [
            "Mostrar todos los grupos por orden alfabético ascedente",
            "Mostrar todos los grupos por orden alfabético descendente",
            "Mostrar todos los grupos por cantidad de km semana realizados conjuntamente ascendente",
            "Mostrar todos los grupos por cantidad de km semana realizados conjuntamente descendente",
            "Mostrar todos los grupos por cantidad de km mes realizados conjuntamente ascendente",
            "Mostrar todos los grupos por cantidad de km mes realizados conjuntamente descendente",
            "Mostrar todos los grupos por cantidad de km año realizados conjuntamente ascendente",
            "Mostrar todos los grupos por cantidad de km año realizados conjuntamente descendente",
            "Mostrar todos los grupos por cantidad de miembros ascendente",
            "Mostrar todos los grupos por cantidad de miembros descendente",
            "Volver al menu principal",
          ],
        },
      ])
      .then((answers) => {
        switch (answers.grupos) {
          case "Mostrar todos los grupos por orden alfabético ascedente":
            this.mostrarGruposAlfabeticamenteAscendente();
            break;
          case "Mostrar todos los grupos por orden alfabético descendente":
            this.mostrarGruposAlfabeticamenteDescendente();
            break;
          case "Mostrar todos los grupos por cantidad de km realizados conjuntamente ascendente":
            this.mostrarGruposKmSemanaAscendente();
            break;
          case "Mostrar todos los grupos por cantidad de km realizados conjuntamente descendente":
            this.mostrarGruposKmSemanaDescendente();
            break;
          case "Mostrar todos los grupos por cantidad de km mes realizados conjuntamente ascendente":
            this.mostrarGruposKmMesAscendente();
            break;
          case "Mostrar todos los grupos por cantidad de km mes realizados conjuntamente descendente":
            this.mostrarGruposKmMesDescendente();
            break;
          case "Mostrar todos los grupos por cantidad de km año realizados conjuntamente ascendente":
            this.mostrarGruposKmAnioAscendente();
            break;
          case "Mostrar todos los grupos por cantidad de km año realizados conjuntamente descendente":
            this.mostrarGruposKmAnioDescendente();
            break;
          case "Mostrar todos los grupos por cantidad de miembros ascendente":
            this.mostrarGruposMiembrosAscendente();
            break;
          case "Mostrar todos los grupos por cantidad de miembros descendente":
            this.mostrarGruposMiembrosDescendente();
            break;
          case "Volver al menu principal":
            this.mainMenu();
            break;
        }
      });
  }
  /**
   * Mostrar grupos por cantidad de km semana realizados conjuntamente ascendente
   */
  mostrarGruposAlfabeticamenteAscendente(): void {
    console.clear();
    const grupos = this.grupos.getAllElements();
    grupos.sort((a, b) =>
      a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase())
    );
    for (let i = 0; i < grupos.length; i++) {
      console.log(grupos[i].nombre);
    }
    this.volver(this.mostrarRutas.bind(this));
  }
  /**
   * Mostrar grupos por cantidad de km semana realizados conjuntamente descendente
   */
  mostrarGruposAlfabeticamenteDescendente(): void {
    console.clear();
    const grupos = this.grupos.getAllElements();
    grupos.sort((a, b) =>
      b.nombre.toLowerCase().localeCompare(a.nombre.toLowerCase())
    );
    for (let i = 0; i < grupos.length; i++) {
      console.log(grupos[i].nombre);
    }
    this.volver(this.mostrarRutas.bind(this));
  }
  /**
   * Mostrar grupos por cantidad de km semana realizados conjuntamente ascendente
   */
  mostrarGruposKmSemanaAscendente(): void {
    console.clear();
    const grupos = this.grupos.getAllElements();
    grupos.sort(
      (a, b) => a.getKmRecorridosSemana() - b.getKmRecorridosSemana()
    );
    for (let i = 0; i < grupos.length; i++) {
      console.log(grupos[i].nombre + " " + grupos[i].getKmRecorridosSemana());
    }
    this.volver(this.mostrarRutas.bind(this));
  }
  /**
   * Mostrar grupos por cantidad de km semana realizados conjuntamente descendente
   */
  mostrarGruposKmSemanaDescendente(): void {
    console.clear();
    const grupos = this.grupos.getAllElements();
    grupos.sort(
      (a, b) => b.getKmRecorridosSemana() - a.getKmRecorridosSemana()
    );
    for (let i = 0; i < grupos.length; i++) {
      console.log(grupos[i].nombre + " " + grupos[i].getKmRecorridosSemana());
    }
    this.volver(this.mostrarRutas.bind(this));
  }
  /**
   * Mostrar grupos por cantidad de km mes realizados conjuntamente ascendente
   */
  mostrarGruposKmMesAscendente(): void {
    console.clear();
    const grupos = this.grupos.getAllElements();
    grupos.sort((a, b) => a.getKmRecorridosMes() - b.getKmRecorridosMes());
    for (let i = 0; i < grupos.length; i++) {
      console.log(grupos[i].nombre + " " + grupos[i].getKmRecorridosMes());
    }
    this.volver(this.mostrarRutas.bind(this));
  }
  /**
   * Mostrar grupos por cantidad de km mes realizados conjuntamente descendente
   */
  mostrarGruposKmMesDescendente(): void {
    console.clear();
    const grupos = this.grupos.getAllElements();
    grupos.sort((a, b) => b.getKmRecorridosMes() - a.getKmRecorridosMes());
    for (let i = 0; i < grupos.length; i++) {
      console.log(grupos[i].nombre + " " + grupos[i].getKmRecorridosMes());
    }
    this.volver(this.mostrarRutas.bind(this));
  }
  /**
   * Mostrar grupos por cantidad de km año realizados conjuntamente ascendente
   */
  mostrarGruposKmAnioAscendente(): void {
    console.clear();
    const grupos = this.grupos.getAllElements();
    grupos.sort((a, b) => a.getKmRecorridosAnio() - b.getKmRecorridosAnio());
    for (let i = 0; i < grupos.length; i++) {
      console.log(grupos[i].nombre + " " + grupos[i].getKmRecorridosAnio());
    }
    this.volver(this.mostrarRutas.bind(this));
  }
  /**
   * Mostrar grupos por cantidad de km año realizados conjuntamente descendente
   */
  mostrarGruposKmAnioDescendente(): void {
    console.clear();
    const grupos = this.grupos.getAllElements();
    grupos.sort((a, b) => b.getKmRecorridosAnio() - a.getKmRecorridosAnio());
    for (let i = 0; i < grupos.length; i++) {
      console.log(grupos[i].nombre + " " + grupos[i].getKmRecorridosAnio());
    }
    this.volver(this.mostrarRutas.bind(this));
  }
  /**
   * Mostrar grupos por cantidad de miembros ascendente
   */
  mostrarGruposMiembrosAscendente(): void {
    console.clear();
    const grupos = this.grupos.getAllElements();
    grupos.sort((a, b) => a.getMiembros().length - b.getMiembros().length);
    for (let i = 0; i < grupos.length; i++) {
      console.log(grupos[i].nombre + " " + grupos[i].getMiembros().length);
    }
    this.volver(this.mostrarRutas.bind(this));
  }
  /**
   * Mostrar grupos por cantidad de miembros descendente
   */
  mostrarGruposMiembrosDescendente(): void {
    console.clear();
    const grupos = this.grupos.getAllElements();
    grupos.sort((a, b) => b.getMiembros().length - a.getMiembros().length);
    for (let i = 0; i < grupos.length; i++) {
      console.log(grupos[i].nombre + " " + grupos[i].getMiembros().length);
    }
    this.volver(this.mostrarRutas.bind(this));
  }
}
