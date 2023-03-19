import { UsuarioCollection } from "../collections/usuario_collection";
import { Usuario, Actividad } from "../datatypes/usuarios";
import { Stats } from "../datatypes/stats";

import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

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
  addElement(element: Usuario): number {
    const usuario = super.addElement(element);
    this.storeUsuario();
    return usuario;
  }
  removeElement(id: number): void {
    super.removeElement(id);
    this.storeUsuario();
  }
  storeUsuario(): void {
    this.db.set("usuarios", [...this.collection.values()]).write();
  }
}
