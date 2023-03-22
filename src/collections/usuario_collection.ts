import { Usuario } from "../datatypes/usuarios";
import { BaseCollection } from "./base_collection";

export class UsuarioCollection extends BaseCollection<Usuario> {
  constructor() {
    super();
  }

  getUsuario(id: number): Usuario {
    if (this.getElement(id) === undefined) {
      throw new Error("No existe el usuario");
    } else {
      return this.getElement(id) as Usuario;
    }
  }
}
