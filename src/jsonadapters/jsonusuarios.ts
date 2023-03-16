import { UsuarioCollection } from "../collections/usuario_collection";
import { Usuario } from "../datatypes/usuarios";
import { Stats } from "../datatypes/stats";

import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

type schemaType = {
  id: number;
  nombre: string;
  actividad: string;
  amigos: number[];
  stats: Stats;
  rutas_favoritas: number[];
  retos_activos: number[];
  historico_rutas: {
    fecha: Date;
    rutaid: number;
  }[];
};

export class JsonUsuario extends UsuarioCollection {
  private db: lowdb.LowdbSync<schemaType>;
  constructor() {
    super();
    this.db = lowdb(new FileSync("../../../data/usuarios.json"));
  }
  addElement(usuario: Usuario) {
    this.db.set("id", usuario.id).write();
  }
}
