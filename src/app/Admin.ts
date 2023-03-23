import { Usuario } from "../datatypes/usuarios";
import { Ruta } from "../datatypes/rutas";
import { Reto } from "../datatypes/retos";
import { Stats } from "../datatypes/stats";
import { Grupo } from "../datatypes/grupos";
import { UsuarioCollection } from "../collections/usuario_collection";
import { RutaCollection } from "../collections/rutas_collection";
import { RetoCollection } from "../collections/retos_collection";
import { GrupoCollection } from "../collections/grupos_collection";
import readline from "readline";
import inquirer from "inquirer";
import { JsonUsuarios } from "../jsonadapters/jsonusuarios";
import { JsonGrupos } from "../jsonadapters/jsongrupos";
import { JsonRutas } from "../jsonadapters/jsonrutas";
import { JsonRetos } from "../jsonadapters/jsonretos";
import { getShebang } from "typescript";
import { Gestor } from "./Gestor";

enum Commandos {
  // MostrarUsuarios = "Mostrar usuarios",
  // MostrarRutas = "Mostrar rutas",
  // MostrarRetos = "Mostrar retos",
  // MostrarGrupos = "Mostrar grupos",
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

export class Admin {
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
          // case Commandos.MostrarUsuarios:
          //   this.mostrarUsuarios();
          //   break;
          // case Commandos.MostrarGrupos:
          //   this.mostrarGrupos();
          //   break;
          // case Commandos.MostrarRutas:
          //   this.mostrarRutas();
          //   break;
          // case Commandos.MostrarRetos:
          //   this.mostrarRetos();
          //   break;
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
  modificarUsuario() {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "usuario",
          message: "¿Que usuario desea modificar?",
          choices: this.usuarios.getNombres(),
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
        this.usuarios.updateElement(usuario);
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
        const reto = this.retos.getElement(answers.retos);
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

  modificarGrupo() {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "grupo",
          message: "¿Que grupo quieres modificar?",
          choices: this.grupos.getNombres(),
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

  modificarRuta() {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "ruta",
          message: "¿Que ruta quieres modificar?",
          choices: this.rutas.getNombres(),
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
        this.mainMenu();
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
        this.mainMenu();
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
        this.mainMenu();
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

  añadirAmigo(): void {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "nombre",
          message: "Elige el usuario que quieres añadir",
          choices: this.usuarios.getNombres(),
        },
      ])
      .then((answers) => {
        const usuario = this.usuarios.findElement(answers.nombre);
        if (usuario == undefined) {
          console.log("El usuario no existe");
          this.añadirAmigo();
        } else {
          this.current_user.addAmigo(usuario.id);
          this.usuarios.updateElement(this.current_user);
          console.log("Amigo añadido correctamente");
          this.mainMenu();
        }
      });
  }
}
