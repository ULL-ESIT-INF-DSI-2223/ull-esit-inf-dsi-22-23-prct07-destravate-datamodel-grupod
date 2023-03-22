import { GrupoCollection } from "../collections/grupos_collection";
import { Grupo } from "../datatypes/grupos";
import { Stats } from "../datatypes/stats";

import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

type schemaType = {
  grupos: {
    id: number;
    nombre: string;
    miembros: number[];
    group_stats: Stats;
    clasificacion: number[];
    rutas_favoritas: number[];
    historico_rutas: {
      fecha: Date;
      rutaid: number;
    }[];
    owner: number;
  }[];
};

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
  addElement(element: Grupo): number {
    const grupos = super.addElement(element);
    this.storeGrupos();
    return grupos;
  }
  removeElement(id: number): void {
    super.removeElement(id);
    this.storeGrupos();
  }
  storeGrupos(): void {
    this.db.set("grupos", [...this.collection.values()]).write();
  }
  updateElement(element: Grupo): void {
    super.updateElement(element);
    this.storeGrupos();
  }
}
