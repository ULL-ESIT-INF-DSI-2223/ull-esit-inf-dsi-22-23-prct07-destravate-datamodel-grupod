import { Grupo } from "../datatypes/grupos";
import { BaseCollection } from "./base_collection";

export class GrupoCollection extends BaseCollection<Grupo> {
  constructor() {
    super();
  }

  getGrupo(id: number): Grupo {
    if (this.getElement(id) === undefined) {
      throw new Error("No existe el grupo");
    } else {
      return this.getElement(id) as Grupo;
    }
  }
}
