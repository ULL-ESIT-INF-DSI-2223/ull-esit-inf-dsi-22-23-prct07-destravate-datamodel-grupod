import { Usuario } from "../datatypes/usuarios";
import { Grupo } from "../datatypes/grupos";
import { Reto } from "../datatypes/retos";
import { Ruta } from "../datatypes/rutas";

export abstract class BaseCollection<T extends Usuario | Grupo | Reto | Ruta> {
  private collection: Map<number, T>;
  constructor() {
    this.collection = new Map<number, T>();
  }
  addElement(element: T): void {
    this.collection.set(element.id, element);
  }
  removeElement(id: number): void {
    this.collection.delete(id);
  }
  getElement(id: number): T | undefined {
    return this.collection.get(id);
  }
}
