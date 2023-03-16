import { RetoCollection } from "../collections/retos_collection";
import { Reto } from "../datatypes/retos";

import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

type schemaType = {
  retos: {
    id: number;
    nombre: string;
    ruta: number[];
    tipo_reto: string;
    km_totales: number;
    usuarios_realizando_reto: number[];
  }[];
};

export class JsonRetoss extends RetoCollection {
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
  addElement(element: Reto): number {
    const retos = super.addElement(element);
    this.storeRetos();
    return retos;
  }
  removeElement(id: number): void {
    super.removeElement(id);
    this.storeRetos();
  }
  storeRetos(): void {
    this.db.set("retos", [...this.collection.values()]).write();
  }
}
