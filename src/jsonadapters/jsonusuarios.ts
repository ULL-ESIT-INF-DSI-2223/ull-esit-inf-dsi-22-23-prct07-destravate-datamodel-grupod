import { UsuarioCollection } from "../collections/usuario_collection";

import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

export class JsonUsuario extends UsuarioCollection {
  private db: lowdb.LowdbSync<UsuarioCollection>;
  constructor() {
    super();
    this.db = lowdb(new FileSync("../../data/usuarios.json"));
    if (!this.db.has("usuarios").value()) {
      this.db.set("usuarios", []).write();
    }
  }
}
