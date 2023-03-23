import { RetoCollection } from "../collections/retos_collection";
import { Reto } from "../datatypes/retos";

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
  retos: {
    id: number;
    nombre: string;
    ruta: number[];
    tipo_reto: Actividad;
    km_totales: number;
    usuarios_realizando_reto: number[];
  }[];
};
/**
 * Clase adaptador de la base de datos de retos
 */
export class JsonRetos extends RetoCollection {
  private db: lowdb.LowdbSync<schemaType>;
  constructor() {
    super();
    this.db = lowdb(new FileSync("./data/retos.json"));
    this.db.defaults({ retos: [] }).write();
    if (this.db.has("retos").value()) {
      const retos = this.db.get("retos").value();
      retos.forEach((item) => {
        const reto = new Reto(
          item.nombre,
          item.ruta,
          item.tipo_reto,
          item.km_totales,
          item.usuarios_realizando_reto
        );
        super.addElement(reto);
      });
    } else {
      this.db.set("retos", []).write();
    }
  }
  /**
   * Añadir un elemento a la colección
   * @param element Elemento a añadir
   * @returns ID del elemento añadido
   */
  addElement(element: Reto): number {
    const retos = super.addElement(element);
    this.storeRetos();
    return retos;
  }
  /**
   * Eliminar un elemento de la colección
   * @param id ID del elemento a eliminar
   */
  removeElement(id: number): void {
    super.removeElement(id);
    this.storeRetos();
  }
  /**
   * Almacenar los retos en la base de datos
   */
  storeRetos(): void {
    this.db.set("retos", [...this.collection.values()]).write();
  }
  /**
   * Actualizar un elemento de la colección
   * @param element Elemento a actualizar
   */
  updateElement(element: Reto): void {
    super.updateElement(element);
    this.storeRetos();
  }
}
