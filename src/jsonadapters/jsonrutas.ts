import { RutaCollection } from "../collections/rutas_collection";
import { Ruta, Coordenadas } from "../datatypes/rutas";

import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

type Actividad = "correr" | "bicicleta" | undefined;

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
  addElement(element: Ruta): number {
    const rutas = super.addElement(element);
    this.storeRutas();
    return rutas;
  }
  removeElement(id: number): void {
    super.removeElement(id);
    this.storeRutas();
  }
  storeRutas(): void {
    this.db.set("rutas", [...this.collection.values()]).write();
  }
  updateElement(element: Ruta): void {
    super.updateElement(element);
    this.storeRutas();
  }
}
