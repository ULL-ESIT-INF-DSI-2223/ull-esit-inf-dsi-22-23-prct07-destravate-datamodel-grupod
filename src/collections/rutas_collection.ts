import { Ruta } from "../datatypes/rutas";
import { BaseCollection } from "./base_collection";

export class RutaCollection extends BaseCollection<Ruta> {
  constructor() {
    super();
  }

  getRuta(id: number): Ruta {
    if (this.getElement(id) === undefined) {
      throw new Error("No existe la ruta");
    } else {
      return this.getElement(id) as Ruta;
    }
  }
}
