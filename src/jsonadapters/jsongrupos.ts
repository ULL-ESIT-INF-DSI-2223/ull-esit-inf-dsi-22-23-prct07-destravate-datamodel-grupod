import { GrupoCollection } from "../collections/grupos_collection";
import { Grupo } from "../datatypes/grupos";
import { Stats } from "../datatypes/stats";

import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { Usuario } from "../datatypes/usuarios";
/**
 * Esquema de la base de datos
 * @typedef schemaType Esquema de la base de datos
 */
type schemaType = {
  grupos: {
    id: number;
    nombre: string;
    miembros: number[];
    group_stats: Stats;
    clasificacion: Usuario[];
    rutas_favoritas: number[];
    historico_rutas: {
      fecha: Date;
      rutaid: number;
    }[];
    owner: number;
  }[];
};
/**
 * Clase adaptadora de la base de datos de grupos
 */
export class JsonGrupos extends GrupoCollection {
  private db: lowdb.LowdbSync<schemaType>;
  constructor() {
    super();
    this.db = lowdb(new FileSync("./data/grupos.json"));
    this.db.defaults({ grupos: [] }).write();
    if (this.db.has("grupos").value()) {
      const grupos = this.db.get("grupos").value();
      grupos.forEach((item) => {
        const grupo = new Grupo(
          item.nombre,
          item.miembros,
          item.group_stats,
          item.clasificacion,
          item.rutas_favoritas,
          item.historico_rutas,
          item.owner
        );
        super.addElement(grupo);
      });
    } else {
      this.db.set("grupos", []).write();
    }
  }
  /**
   * Añadir un elemento a la colección
   * @param element Elemento a añadir
   * @returns ID del elemento añadido
   */
  addElement(element: Grupo): number {
    const grupos = super.addElement(element);
    this.storeGrupos();
    return grupos;
  }
  /**
   * Eliminar un elemento de la colección
   * @param id ID del elemento a eliminar
   * @returns Verdadero si se ha eliminado el elemento
   */
  removeElement(id: number): boolean {
    const result = super.removeElement(id);
    this.storeGrupos();
    return result;
  }
  /**
   * Almacenar los grupos en la base de datos
   */
  storeGrupos(): void {
    this.db.set("grupos", [...this.collection.values()]).write();
  }
  /**
   * Actualizar un elemento de la colección
   * @param element Elemento a actualizar
   */
  updateElement(element: Grupo): void {
    super.updateElement(element);
    this.storeGrupos();
  }
}
