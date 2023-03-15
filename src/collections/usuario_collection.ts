import { Usuario } from "../datatypes/usuarios";
import { BaseCollection } from "./base_collection";

export class UsuarioCollection extends BaseCollection<Usuario> {
  constructor() {
    super();
  }
}
