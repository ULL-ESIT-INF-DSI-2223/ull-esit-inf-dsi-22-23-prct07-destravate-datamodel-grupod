import { UsuarioCollection } from "../collections/usuario_collection";
import { Usuario } from "../datatypes/usuarios";
import { Stats } from "../datatypes/stats";

import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
/**
 * Tipo de actividad
 */
type Actividad = "correr" | "bicicleta" | undefined;
/**
 * Esquema de la base de datos
 */
type schemaType = {
  usuarios: {
    id: number;
    nombre: string;
    actividad: Actividad;
    amigos: number[];
    stats: Stats;
    rutas_favoritas: number[];
    retos_activos: number[];
    historico_rutas: {
      fecha: Date;
      rutaid: number;
    }[];
  }[];
};
/**
 * Clase adaptadora de la base de datos de usuarios
 */
export class JsonUsuarios extends UsuarioCollection {
  private db: lowdb.LowdbSync<schemaType>;
  constructor() {
    super();
    this.db = lowdb(new FileSync("./data/usuarios.json"));
    this.db.defaults({ usuarios: [] }).write();
    if (this.db.has("usuarios").value()) {
      const usuarios = this.db.get("usuarios").value();
      usuarios.forEach((item) => {
        const usuario = new Usuario(
          item.nombre,
          item.actividad,
          item.amigos,
          item.stats,
          item.rutas_favoritas,
          item.retos_activos,
          item.historico_rutas
        );
        super.addElement(usuario);
      });
    } else {
      this.db.set("usuarios", []).write();
    }
  }
  /**
   * Añadir un elemento a la colección
   * @param element Elemento a añadir
   * @returns ID del elemento añadido
   */
  addElement(element: Usuario): number {
    const usuario = super.addElement(element);
    this.storeUsuario();
    return usuario;
  }
  /**
   * Eliminar un elemento de la colección
   * @param id ID del elemento a eliminar
   */
  removeElement(id: number): void {
    super.removeElement(id);
    this.storeUsuario();
  }
  /**
   * Almacenar los usuarios en la base de datos
   */
  storeUsuario(): void {
    this.db.set("usuarios", [...this.collection.values()]).write();
  }
  /**
   * Actualizar un elemento de la colección
   * @param element Elemento a actualizar
   */
  updateElement(element: Usuario): void {
    super.updateElement(element);
    this.storeUsuario();
  }
}
