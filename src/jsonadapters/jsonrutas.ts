import { RutaCollection } from "../collections/rutas_collection";
import { Ruta, Coordenadas } from "../datatypes/rutas";

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
  rutas: {
    id: number;
    nombre: string;
    coordenadas_inicio: Coordenadas;
    coordenadas_fin: Coordenadas;
    longitud: number;
    desnivel: number;
    usuarios_ya_realizados: number[];
    tipo_ruta: Actividad;
    calificacion: number[];
  }[];
};
/**
 * Clase adaptadora de la base de datos rutas
 */
export class JsonRutas extends RutaCollection {
  private db: lowdb.LowdbSync<schemaType>;
  constructor() {
    super();
    this.db = lowdb(new FileSync("./data/rutas.json"));
    this.db.defaults({ rutas: [] }).write();
    if (this.db.has("rutas").value()) {
      const rutas = this.db.get("rutas").value();
      rutas.forEach((item) => {
        const ruta = new Ruta(
          item.nombre,
          item.coordenadas_inicio,
          item.coordenadas_fin,
          item.longitud,
          item.desnivel,
          item.usuarios_ya_realizados,
          item.tipo_ruta,
          item.calificacion
        );
        super.addElement(ruta);
      });
    } else {
      this.db.set("rutas", []).write();
    }
  }
  /**
   * Añadir un elemento a la colección
   * @param element Elemento a añadir
   * @returns ID del elemento añadido
   */
  addElement(element: Ruta): number {
    const rutas = super.addElement(element);
    this.storeRutas();
    return rutas;
  }
  /**
   * Eliminar un elemento de la colección
   * @param id ID del elemento a eliminar
   * @returns Verdadero si se ha eliminado el elemento
   */
  removeElement(id: number): boolean {
    const result = super.removeElement(id);
    this.storeRutas();
    return result;
  }
  /**
   * Almacenar las rutas en la base de datos
   */
  storeRutas(): void {
    this.db.set("rutas", [...this.collection.values()]).write();
  }
  /**
   * Actualizar un elemento de la colección
   * @param element Elemento a actualizar
   */
  updateElement(element: Ruta): void {
    super.updateElement(element);
    this.storeRutas();
  }
}
