import { Usuario } from "../datatypes/usuarios";
import { BaseCollection } from "./base_collection";
/**
 * Colección de usuarios
 */
export class UsuarioCollection extends BaseCollection<Usuario> {
  constructor() {
    super();
  }
}
