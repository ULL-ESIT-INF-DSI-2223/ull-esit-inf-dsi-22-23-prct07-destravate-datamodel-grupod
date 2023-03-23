// import { Usuario } from "./datatypes/usuarios";
// import { Ruta } from "./datatypes/rutas";
// import { Reto } from "./datatypes/retos";
// import { Stats } from "./datatypes/stats";
// import { Grupo } from "./datatypes/grupos";
// import { UsuarioCollection } from "./collections/usuario_collection";
// import { RutaCollection } from "./collections/rutas_collection";
// import { RetoCollection } from "./collections/retos_collection";
// import { GrupoCollection } from "./collections/grupos_collection";
// import readline from "readline";
// import inquirer from "inquirer";
// import { JsonUsuarios } from "./jsonadapters/jsonusuarios";
// import { JsonGruposline from "readline";
// import inquirer from "inquirer";
// import { JsonUsuarios } from "./jsonadapters/jsonusuarios";
// import { JsonGrupos } from "./jsonadapters/jsongrupos";
// import { JsonRutas } from "./jsonadapters/jsonrutas";
// import { JsonRetos } from "./jsonadapters/jsonretos";
// import { App } from "./app";



//   public mostrarUsuarios(): void {
//     console.clear();
//     inquirer
//       .prompt([
//         {
//           type: "list",
//           name: "usuarios",
//           message: "¿Como quieres ver la lista de usuarios?",
//           choices: [
//             "Mostrar todos los usuarios alfabeticamente",
//             "Mostrar todos los usuarios por numero de km recorridos",
//           ],
//         },
//       ])
//       .then((answers) => {
//         switch (answers.usuarios) {
//           case "Mostrar todos los usuarios alfabeticamente":
//             this.mostrarUsuariosAlfabeticamente();
//             break;
//           case "Mostrar todos los usuarios por numero de km recorridos":
//             this.mostrarUsuariosPorKmRecorridos();
//             break;
//         }
//       });
//   }

//   public mostrarUsuariosAlfabeticamente(): void {
//     console.clear();
//     inquirer
//       .prompt([
//         {
//           type: "list",
//           name: "usuarios",
//           message: "¿Como quieres ver la lista de usuarios?",
//           choices: [
//             "Mostrar todos los usuarios alfabeticamente ascendente",
//             "Mostrar todos los usuarios alfabeticamente descendente",
//           ],
//         },
//       ])
//       .then((answers) => {
//         switch (answers.usuarios) {
//           case "Mostrar todos los usuarios alfabeticamente ascendente":
//             this.mostrarUsuariosAlfabeticamenteAscendente();
//             break;
//           case "Mostrar todos los usuarios alfabeticamente descendente":
//             this.mostrarUsuariosAlfabeticamenteDescendente();
//             break;
//         }
//       });
//   }

//   public mostrarUsuariosAlfabeticamenteAscendente(): void {
//     console.clear();
//     console.log("Mostrar todos los usuarios alfabeticamente ascendente");
//     const usuariosOrdenados: Usuario[] = [];
//     if (this.usuarios.length() > 0) {
//       this.usuarios.forEach((usuario) => {
//         if (usuariosOrdenados.length == 0) {
//           usuariosOrdenados.push(usuario);
//         } else {
//           for (let i = 0; i < usuariosOrdenados.length; i++) {
//             if (
//               usuario.getNombre().toLowerCase() <
//               usuariosOrdenados[i].getNombre().toLowerCase()
//             ) {
//               usuariosOrdenados.splice(i, 0, usuario);
//               break;
//             } else if (i == usuariosOrdenados.length - 1) {
//               usuariosOrdenados.push(usuario);
//               break;
//             }
//           }
//         }
//       });
//     }
//     for (let i = 0; i < usuariosOrdenados.length; i++) {
//       console.log(usuariosOrdenados[i].getNombre());
//     }
//   }

//   public mostrarUsuariosAlfabeticamenteDescendente(): void {
//     console.clear();
//     console.log("Mostrar todos los usuarios alfabeticamente descendente");
//     const usuariosOrdenados: Usuario[] = [];
//     if (this.usuarios.length() > 0) {
//       this.usuarios.forEach((usuario) => {
//         if (usuariosOrdenados.length == 0) {
//           usuariosOrdenados.push(usuario);
//         } else {
//           for (let i = 0; i < usuariosOrdenados.length; i++) {
//             if (
//               usuario.getNombre().toLowerCase() >
//               usuariosOrdenados[i].getNombre().toLowerCase()
//             ) {
//               usuariosOrdenados.splice(i, 0, usuario);
//               break;
//             } else if (i == usuariosOrdenados.length - 1) {
//               usuariosOrdenados.push(usuario);
//               break;
//             }
//           }
//         }
//       });
//     }
//     for (let i = 0; i < usuariosOrdenados.length; i++) {
//       console.log(usuariosOrdenados[i].getNombre());
//     }
//   }

//   public mostrarUsuariosPorKmRecorridos(): void {
//     console.clear();
//     inquirer
//       .prompt([
//         {
//           type: "list",
//           name: "usuarios",
//           message: "¿Como quieres ver la lista de usuarios?",
//           choices: [
//             "Mostrar todos los usuarios por numero de km en la semana",
//             "Mostrar todos los usuarios por numero de km en el mes",
//             "Mostrar todos los usuarios por numero de km en el año",
//           ],
//         },
//       ])
//       .then((answers) => {
//         switch (answers.usuarios) {
//           case "Mostrar todos los usuarios por numero de km en la semana":
//             this.mostrarUsuariosPorKmRecorridosSemana();
//             break;
//           case "Mostrar todos los usuarios por numero de km en el mes":
//             this.mostrarUsuariosPorKmRecorridosMes();
//             break;
//           case "Mostrar todos los usuarios por numero de km en el año":
//             this.mostrarUsuariosPorKmRecorridosAnio();
//             break;
//         }
//       });
//   }

//   public mostrarUsuariosPorKmRecorridosSemana(): void {
//     console.clear();
//     console.log("Mostrar todos los usuarios por numero de km en la semana");
//     const usuariosOrdenados: Usuario[] = [];
//     if (this.usuarios.length() > 0) {
//       this.usuarios.forEach((usuario) => {
//         if (usuariosOrdenados.length == 0) {
//           usuariosOrdenados.push(usuario);
//         } else {
//           for (let i = 0; i < usuariosOrdenados.length; i++) {
//             if (
//               usuario.getKmRecorridosSemana() >
//               usuariosOrdenados[i].getKmRecorridosSemana()
//             ) {
//               usuariosOrdenados.splice(i, 0, usuario);
//               break;
//             } else if (i == usuariosOrdenados.length - 1) {
//               usuariosOrdenados.push(usuario);
//               break;
//             }
//           }
//         }
//       });
//     }
//     for (let i = 0; i < usuariosOrdenados.length; i++) {
//       console.log(
//         usuariosOrdenados[i].getNombre() +
//           " " +
//           usuariosOrdenados[i].getKmRecorridosSemana()
//       );
//     }
//   }

//   public mostrarUsuariosPorKmRecorridosMes(): void {
//     console.clear();
//     console.log("Mostrar todos los usuarios por numero de km en el mes");
//     const usuariosOrdenados: Usuario[] = [];
//     if (this.usuarios.length() > 0) {
//       this.usuarios.forEach((usuario) => {
//         if (usuariosOrdenados.length == 0) {
//           usuariosOrdenados.push(usuario);
//         } else {
//           for (let i = 0; i < usuariosOrdenados.length; i++) {
//             if (
//               usuario.getKmRecorridosMes() >
//               usuariosOrdenados[i].getKmRecorridosMes()
//             ) {
//               usuariosOrdenados.splice(i, 0, usuario);
//               break;
//             } else if (i == usuariosOrdenados.length - 1) {
//               usuariosOrdenados.push(usuario);
//               break;
//             }
//           }
//         }
//       });
//     }
//     for (let i = 0; i < usuariosOrdenados.length; i++) {
//       console.log(
//         usuariosOrdenados[i].getNombre() +
//           " " +
//           usuariosOrdenados[i].getKmRecorridosMes()
//       );
//     }
//   }

//   public mostrarUsuariosPorKmRecorridosAnio(): void {
//     console.clear();
//     console.log("Mostrar todos los usuarios por numero de km en el año");
//     const usuariosOrdenados: Usuario[] = [];
//     if (this.usuarios.length() > 0) {
//       this.usuarios.forEach((usuario) => {
//         if (usuariosOrdenados.length == 0) {
//           usuariosOrdenados.push(usuario);
//         } else {
//           for (let i = 0; i < usuariosOrdenados.length; i++) {
//             if (
//               usuario.getKmRecorridosAnio() >
//               usuariosOrdenados[i].getKmRecorridosAnio()
//             ) {
//               usuariosOrdenados.splice(i, 0, usuario);
//               break;
//             } else if (i == usuariosOrdenados.length - 1) {
//               usuariosOrdenados.push(usuario);
//               break;
//             }
//           }
//         }
//       });
//     }
//     for (let i = 0; i < usuariosOrdenados.length; i++) {
//       console.log(
//         usuariosOrdenados[i].getNombre() +
//           " " +
//           usuariosOrdenados[i].getKmRecorridosAnio()
//       );
//     }
//   }

//   public mostrarGrupos(): void {
//     console.clear();
//     inquirer
//       .prompt([
//         {
//           type: "list",
//           name: "grupos",
//           message: "¿Como quieres ver la lista de grupos?",
//           choices: [
//             "Mostrar todos los grupos alfabeticamente",
//             "Mostrar todos los grupos por numero de km recorridos",
//             "Mostrar todos los grupos por numero de miembros",
//           ],
//         },
//       ])
//       .then((answers) => {
//         switch (answers.grupos) {
//           case "Mostrar todos los grupos alfabeticamente":
//             this.mostrarGruposAlfabeticamente();
//             break;
//           case "Mostrar todos los grupos por numero de km recorridos":
//             this.mostrarGruposPorKmRecorridos();
//             break;
//           case "Mostrar todos los grupos por numero de miembros":
//             this.mostrarGruposPorNumeroDeMiembros();
//             break;
//         }
//       });
//   }

//   public mostrarGruposAlfabeticamente(): void {
//     console.clear();
//     inquirer
//       .prompt([
//         {
//           type: "list",
//           name: "grupos",
//           message: "¿Como quieres ver la lista de grupos?",
//           choices: [
//             "Mostrar todos los grupos alfabeticamente ascendente",
//             "Mostrar todos los grupos alfabeticamente descendente",
//           ],
//         },
//       ])
//       .then((answers) => {
//         switch (answers.grupos) {
//           case "Mostrar todos los grupos alfabeticamente ascendente":
//             this.mostrarGruposAlfabeticamenteAscendente();
//             break;
//           case "Mostrar todos los grupos alfabeticamente descendente":
//             this.mostrarGruposAlfabeticamenteDescendente();
//             break;
//         }
//       });
//   }

//   public mostrarGruposAlfabeticamenteAscendente(): void {
//     console.clear();
//     console.log("Mostrar todos los grupos alfabeticamente ascendente");
//     const gruposOrdenados: Grupo[] = [];
//     if (this.grupos.length() > 0) {
//       this.grupos.forEach((grupo) => {
//         if (gruposOrdenados.length == 0) {
//           gruposOrdenados.push(grupo);
//         } else {
//           for (let i = 0; i < gruposOrdenados.length; i++) {
//             if (
//               grupo.nombre.toLowerCase() <
//               gruposOrdenados[i].nombre.toLowerCase()
//             ) {
//               gruposOrdenados.splice(i, 0, grupo);
//               break;
//             } else if (i == gruposOrdenados.length - 1) {
//               gruposOrdenados.push(grupo);
//               break;
//             }
//           }
//         }
//       });
//     }
//     for (let i = 0; i < gruposOrdenados.length; i++) {
//       console.log(gruposOrdenados[i].nombre);
//     }
//     console.log("Pulsa enter para volver al menu principal");
//     const rl = readline.createInterface({
//       input: process.stdin,
//       output: process.stdout,
//     });
//     rl.on("line", () => {
//       this.mainMenu();
//     });
//   }

//   public mostrarGruposAlfabeticamenteDescendente(): void {
//     console.clear();
//     console.log("Mostrar todos los grupos alfabeticamente descendente");
//     const gruposOrdenados: Grupo[] = [];
//     if (this.grupos.length() > 0) {
//       this.grupos.forEach((grupo) => {
//         if (gruposOrdenados.length == 0) {
//           gruposOrdenados.push(grupo);
//         } else {
//           for (let i = 0; i < gruposOrdenados.length; i++) {
//             if (
//               grupo.nombre.toLowerCase() >
//               gruposOrdenados[i].nombre.toLowerCase()
//             ) {
//               gruposOrdenados.splice(i, 0, grupo);
//               break;
//             } else if (i == gruposOrdenados.length - 1) {
//               gruposOrdenados.push(grupo);
//               break;
//             }
//           }
//         }
//       });
//     }
//     for (let i = 0; i < gruposOrdenados.length; i++) {
//       console.log(gruposOrdenados[i].nombre);
//     }
//     console.log("Pulsa enter para volver al menu principal");
//     const rl = readline.createInterface({
//       input: process.stdin,
//       output: process.stdout,
//     });
//     rl.on("line", () => {
//       this.mainMenu();
//     });
//   }

//   public mostrarGruposPorKmRecorridos(): void {
//     console.clear();
//     inquirer
//       .prompt([
//         {
//           type: "list",
//           name: "grupos",
//           message: "¿Como quieres ver la lista de grupos?",
//           choices: [
//             "Mostrar todos los grupos por numero de km recorridos en la semana",
//             "Mostrar todos los grupos por numero de km recorridos en el mes",
//             "Mostrar todos los grupos por numero de km recorridos en el año",
//           ],
//         },
//       ])
//       .then((answers) => {
//         switch (answers.grupos) {
//           case "Mostrar todos los grupos por numero de km recorridos en la semana":
//             this.mostrarGruposPorKmRecorridosSemana();
//             break;
//           case "Mostrar todos los grupos por numero de km recorridos en el mes":
//             this.mostrarGruposPorKmRecorridosMes();
//             break;
//           case "Mostrar todos los grupos por numero de km recorridos en el año":
//             this.mostrarGruposPorKmRecorridosAnio();
//             break;
//         }
//       });
//   }

//   public mostrarGruposPorKmRecorridosSemana(): void {
//     console.clear();
//     console.log(
//       "Mostrar todos los grupos por numero de km recorridos en la semana"
//     );
//     const gruposOrdenados: Grupo[] = [];
//     if (this.grupos.length() > 0) {
//       this.grupos.forEach((grupo) => {
//         if (gruposOrdenados.length == 0) {
//           gruposOrdenados.push(grupo);
//         } else {
//           for (let i = 0; i < gruposOrdenados.length; i++) {
//             if (
//               grupo.getKmRecorridosSemana() >
//               gruposOrdenados[i].getKmRecorridosSemana()
//             ) {
//               gruposOrdenados.splice(i, 0, grupo);
//               break;
//             } else if (i == gruposOrdenados.length - 1) {
//               gruposOrdenados.push(grupo);
//               break;
//             }
//           }
//         }
//       });
//     }
//     for (let i = 0; i < gruposOrdenados.length; i++) {
//       console.log(
//         gruposOrdenados[i].nombre +
//           " " +
//           gruposOrdenados[i].getKmRecorridosSemana()
//       );
//     }
//   }

//   public mostrarGruposPorKmRecorridosMes(): void {
//     console.clear();
//     console.log(
//       "Mostrar todos los grupos por numero de km recorridos en el mes"
//     );
//     const gruposOrdenados: Grupo[] = [];
//     if (this.grupos.length() > 0) {
//       this.grupos.forEach((grupo) => {
//         if (gruposOrdenados.length == 0) {
//           gruposOrdenados.push(grupo);
//         } else {
//           for (let i = 0; i < gruposOrdenados.length; i++) {
//             if (
//               grupo.getKmRecorridosMes() >
//               gruposOrdenados[i].getKmRecorridosMes()
//             ) {
//               gruposOrdenados.splice(i, 0, grupo);
//               break;
//             } else if (i == gruposOrdenados.length - 1) {
//               gruposOrdenados.push(grupo);
//               break;
//             }
//           }
//         }
//       });
//     }
//     for (let i = 0; i < gruposOrdenados.length; i++) {
//       console.log(
//         gruposOrdenados[i].nombre +
//           " " +
//           gruposOrdenados[i].getKmRecorridosMes()
//       );
//     }
//   }

//   public mostrarGruposPorKmRecorridosAnio(): void {
//     console.clear();
//     console.log(
//       "Mostrar todos los grupos por numero de km recorridos en el año"
//     );
//     const gruposOrdenados: Grupo[] = [];
//     if (this.grupos.length() > 0) {
//       this.grupos.forEach((grupo) => {
//         if (gruposOrdenados.length == 0) {
//           gruposOrdenados.push(grupo);
//         } else {
//           for (let i = 0; i < gruposOrdenados.length; i++) {
//             if (
//               grupo.getKmRecorridosAnio() >
//               gruposOrdenados[i].getKmRecorridosAnio()
//             ) {
//               gruposOrdenados.splice(i, 0, grupo);
//               break;
//             } else if (i == gruposOrdenados.length - 1) {
//               gruposOrdenados.push(grupo);
//               break;
//             }
//           }
//         }
//       });
//     }
//     for (let i = 0; i < gruposOrdenados.length; i++) {
//       console.log(
//         gruposOrdenados[i].nombre +
//           " " +
//           gruposOrdenados[i].getKmRecorridosAnio()
//       );
//     }
//   }

//   public mostrarGruposPorNumeroDeMiembros(): void {
//     console.clear();
//     inquirer
//       .prompt([
//         {
//           type: "list",
//           name: "grupos",
//           message: "¿Como quieres ver la lista de grupos?",
//           choices: [
//             "Mostrar todos los grupos por numero de miembros ascendente",
//             "Mostrar todos los grupos por numero de miembros descendente",
//           ],
//         },
//       ])
//       .then((answers) => {
//         switch (answers.grupos) {
//           case "Mostrar todos los grupos por numero de miembros ascendente":
//             this.mostrarGruposPorNumeroDeMiembrosAscendente();
//             break;
//           case "Mostrar todos los grupos por numero de miembros descendente":
//             this.mostrarGruposPorNumeroDeMiembrosDescendente();
//             break;
//         }
//       });
//   }

//   public mostrarGruposPorNumeroDeMiembrosAscendente(): void {
//     console.clear();
//     console.log("Mostrar todos los grupos por numero de miembros ascendente");
//     const gruposOrdenados: Grupo[] = [];
//     if (this.grupos.length() > 0) {
//       this.grupos.forEach((grupo) => {
//         if (gruposOrdenados.length == 0) {
//           gruposOrdenados.push(grupo);
//         } else {
//           for (let i = 0; i < gruposOrdenados.length; i++) {
//             if (
//               grupo.getMiembros().length <
//               gruposOrdenados[i].getMiembros().length
//             ) {
//               gruposOrdenados.splice(i, 0, grupo);
//               break;
//             } else if (i == gruposOrdenados.length - 1) {
//               gruposOrdenados.push(grupo);
//               break;
//             }
//           }
//         }
//       });
//     }
//     for (let i = 0; i < gruposOrdenados.length; i++) {
//       console.log(gruposOrdenados[i].nombre);
//     }
//   }

//   public mostrarGruposPorNumeroDeMiembrosDescendente(): void {
//     console.clear();
//     console.log("Mostrar todos los grupos por numero de miembros descendente");
//     const gruposOrdenados: Grupo[] = [];
//     if (this.grupos.length() > 0) {
//       this.grupos.forEach((grupo) => {
//         if (gruposOrdenados.length == 0) {
//           gruposOrdenados.push(grupo);
//         } else {
//           for (let i = 0; i < gruposOrdenados.length; i++) {
//             if (
//               grupo.getMiembros().length >
//               gruposOrdenados[i].getMiembros().length
//             ) {
//               gruposOrdenados.splice(i, 0, grupo);
//               break;
//             } else if (i == gruposOrdenados.length - 1) {
//               gruposOrdenados.push(grupo);
//               break;
//             }
//           }
//         }
//       });
//     }
//     for (let i = 0; i < gruposOrdenados.length; i++) {
//       console.log(gruposOrdenados[i].nombre);
//     }
//   }

//   public mostrarRetos(): void {
//     console.clear();
//     inquirer
//       .prompt([
//         {
//           type: "list",
//           name: "retos",
//           message: "¿Como quieres ver la lista de retos?",
//           choices: [
//             "Mostrar todos los retos por nombre",
//             "Mostrar todos los retos por numero de km totales",
//             "Mostrar todos los retos por numero de km usuarios registrados",
//           ],
//         },
//       ])
//       .then((answers) => {
//         switch (answers.retos) {
//           case "Mostrar todos los retos por numero de participantes":
//             this.mostrarRetosPorNombre();
//             break;
//           case "Mostrar todos los retos por numero de km recorridos":
//             this.mostrarRetosPorKmTotales();
//             break;
//           case "Mostrar todos los retos por numero de km recorridos en la semana":
//             this.mostrarRetosPorUsuariosRegistrados();
//             break;
//         }
//       });
//   }

//   public mostrarRetosPorNombre(): void {
//     console.clear();
//     inquirer
//       .prompt([
//         {
//           type: "list",
//           name: "retos",
//           message: "¿Como quieres ver la lista de retos?",
//           choices: [
//             "Mostrar todos los retos por nombre ascendente",
//             "Mostrar todos los retos por nombre descendente",
//           ],
//         },
//       ])
//       .then((answers) => {
//         switch (answers.retos) {
//           case "Mostrar todos los retos por nombre ascendente":
//             this.mostrarRetosPorNombreAscendente();
//             break;
//           case "Mostrar todos los retos por nombre descendente":
//             this.mostrarRetosPorNombreDescendente();
//             break;
//         }
//       });
//   }

//   public mostrarRetosPorNombreAscendente(): void {
//     console.clear();
//     console.log("Mostrar todos los retos por nombre ascendente");
//     const retosOrdenados: Reto[] = [];
//     if (this.retos.length() > 0) {
//       this.retos.forEach((reto) => {
//         if (retosOrdenados.length == 0) {
//           retosOrdenados.push(reto);
//         } else {
//           for (let i = 0; i < retosOrdenados.length; i++) {
//             if (reto.nombre < retosOrdenados[i].nombre) {
//               retosOrdenados.splice(i, 0, reto);
//               break;
//             } else if (i == retosOrdenados.length - 1) {
//               retosOrdenados.push(reto);
//               break;
//             }
//           }
//         }
//       });
//     }
//     for (let i = 0; i < retosOrdenados.length; i++) {
//       console.log(retosOrdenados[i].nombre);
//     }
//   }

//   public mostrarRetosPorNombreDescendente(): void {
//     console.clear();
//     console.log("Mostrar todos los retos por nombre descendente");
//     const retosOrdenados: Reto[] = [];
//     if (this.retos.length() > 0) {
//       this.retos.forEach((reto) => {
//         if (retosOrdenados.length == 0) {
//           retosOrdenados.push(reto);
//         } else {
//           for (let i = 0; i < retosOrdenados.length; i++) {
//             if (reto.nombre > retosOrdenados[i].nombre) {
//               retosOrdenados.splice(i, 0, reto);
//               break;
//             } else if (i == retosOrdenados.length - 1) {
//               retosOrdenados.push(reto);
//               break;
//             }
//           }
//         }
//       });
//     }
//     for (let i = 0; i < retosOrdenados.length; i++) {
//       console.log(retosOrdenados[i].nombre);
//     }
//   }

//   public mostrarRetosPorKmTotales(): void {
//     console.clear();
//     inquirer
//       .prompt([
//         {
//           type: "list",
//           name: "retos",
//           message: "¿Como quieres ver la lista de retos?",
//           choices: [
//             "Mostrar todos los retos por numero de km totales ascendente",
//             "Mostrar todos los retos por numero de km totales descendente",
//           ],
//         },
//       ])
//       .then((answers) => {
//         switch (answers.retos) {
//           case "Mostrar todos los retos por numero de km totales ascendente":
//             this.mostrarRetosPorKmTotalesAscendente();
//             break;
//           case "Mostrar todos los retos por numero de km totales descendente":
//             this.mostrarRetosPorKmTotalesDescendente();
//             break;
//         }
//       });
//   }

//   public mostrarRetosPorKmTotalesAscendente(): void {
//     console.clear();
//     console.log("Mostrar todos los retos por numero de km totales ascendente");
//     const retosOrdenados: Reto[] = [];
//     if (this.retos.length() > 0) {
//       this.retos.forEach((reto) => {
//         if (retosOrdenados.length == 0) {
//           retosOrdenados.push(reto);
//         } else {
//           for (let i = 0; i < retosOrdenados.length; i++) {
//             if (reto.getKmTotales() < retosOrdenados[i].getKmTotales()) {
//               retosOrdenados.splice(i, 0, reto);
//               break;
//             } else if (i == retosOrdenados.length - 1) {
//               retosOrdenados.push(reto);
//               break;
//             }
//           }
//         }
//       });
//     }
//     for (let i = 0; i < retosOrdenados.length; i++) {
//       console.log(retosOrdenados[i].nombre);
//     }
//   }

//   public mostrarRetosPorKmTotalesDescendente(): void {
//     console.clear();
//     console.log("Mostrar todos los retos por numero de km totales descendente");
//     const retosOrdenados: Reto[] = [];
//     console.log("cuantos retos hay" + this.retos.length());
//     if (this.retos.length() > 0) {
//       this.retos.forEach((reto) => {
//         if (retosOrdenados.length == 0) {
//           retosOrdenados.push(reto);
//         } else {
//           for (let i = 0; i < retosOrdenados.length; i++) {
//             if (reto.getKmTotales() > retosOrdenados[i].getKmTotales()) {
//               retosOrdenados.splice(i, 0, reto);
//               break;
//             } else if (i == retosOrdenados.length - 1) {
//               retosOrdenados.push(reto);
//               break;
//             }
//           }
//         }
//       });
//     }
//     for (let i = 0; i < retosOrdenados.length; i++) {
//       console.log(retosOrdenados[i].nombre);
//     }
//   }

//   public mostrarRetosPorUsuariosRegistrados(): void {
//     console.clear();
//     inquirer
//       .prompt([
//         {
//           type: "list",
//           name: "retos",
//           message: "¿Como quieres ver la lista de retos?",
//           choices: [
//             "Mostrar todos los retos por numero de usuarios registrados ascendente",
//             "Mostrar todos los retos por numero de usuarios registrados descendente",
//           ],
//         },
//       ])
//       .then((answers) => {
//         switch (answers.retos) {
//           case "Mostrar todos los retos por numero de usuarios registrados ascendente":
//             this.mostrarRetosPorUsuariosRegistradosAscendente();
//             break;
//           case "Mostrar todos los retos por numero de usuarios registrados descendente":
//             this.mostrarRetosPorUsuariosRegistradosDescendente();
//             break;
//         }
//       });
//     console.log("Pulsa enter para volver al menu principal");
//     const rl = readline.createInterface({
//       input: process.stdin,
//       output: process.stdout,
//     });
//     rl.on("line", () => {
//       this.mainMenu();
//     });
//   }

//   public mostrarRetosPorUsuariosRegistradosAscendente(): void {
//     console.clear();
//     console.log(
//       "Mostrar todos los retos por numero de usuarios registrados ascendente"
//     );
//     const retosOrdenados: Reto[] = [];
//     if (this.retos.length() > 0) {
//       this.retos.forEach((reto) => {
//         if (retosOrdenados.length == 0) {
//           retosOrdenados.push(reto);
//         } else {
//           for (let i = 0; i < retosOrdenados.length; i++) {
//             if (
//               reto.getUsuariosRealizandoReto() <
//               retosOrdenados[i].getUsuariosRealizandoReto()
//             ) {
//               retosOrdenados.splice(i, 0, reto);
//               break;
//             } else if (i == retosOrdenados.length - 1) {
//               retosOrdenados.push(reto);
//               break;
//             }
//           }
//         }
//       });
//     }
//     for (let i = 0; i < retosOrdenados.length; i++) {
//       console.log(retosOrdenados[i].nombre);
//     }
//   }

//   public mostrarRetosPorUsuariosRegistradosDescendente(): void {
//     console.clear();
//     console.log(
//       "Mostrar todos los retos por numero de usuarios registrados descendente"
//     );
//     const retosOrdenados: Reto[] = [];
//     if (this.retos.length() > 0) {
//       this.retos.forEach((reto) => {
//         if (retosOrdenados.length == 0) {
//           retosOrdenados.push(reto);
//         } else {
//           for (let i = 0; i < retosOrdenados.length; i++) {
//             if (
//               reto.getUsuariosRealizandoReto() >
//               retosOrdenados[i].getUsuariosRealizandoReto()
//             ) {
//               retosOrdenados.splice(i, 0, reto);
//               break;
//             } else if (i == retosOrdenados.length - 1) {
//               retosOrdenados.push(reto);
//               break;
//             }
//           }
//         }
//       });
//     }
//     for (let i = 0; i < retosOrdenados.length; i++) {
//       console.log(retosOrdenados[i].nombre);
//     }
//   }
