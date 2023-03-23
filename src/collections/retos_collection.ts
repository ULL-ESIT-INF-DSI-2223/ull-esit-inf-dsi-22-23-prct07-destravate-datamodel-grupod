import { Reto } from "../datatypes/retos";
import { BaseCollection } from "./base_collection";

export class RetoCollection extends BaseCollection<Reto> {
  constructor() {
    super();
  }

  getReto(idRuta: number): Reto {
    if (this.getElement(idRuta) === undefined) {
      throw new Error("No existe el reto");
    } else {
      return this.getElement(idRuta);
    }
  }
}
