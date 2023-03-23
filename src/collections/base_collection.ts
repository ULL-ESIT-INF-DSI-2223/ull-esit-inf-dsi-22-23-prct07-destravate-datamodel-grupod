import { Usuario } from "../datatypes/usuarios";
import { Grupo } from "../datatypes/grupos";
import { Reto } from "../datatypes/retos";
import { Ruta } from "../datatypes/rutas";

export abstract class BaseCollection<T extends Usuario | Grupo | Reto | Ruta> {
  protected collection: Map<number, T>;
  constructor() {
    this.collection = new Map<number, T>();
  }
  addElement(element: T): number {
    this.collection.set(element.id, element);
    return element.id;
  }
  removeElement(id: number): void {
    this.collection.delete(id);
  }
  updateElement(element: T): void {
    this.collection.set(element.id, element);
  }
  getElement(id: number): T | undefined {
    return this.collection.get(id);
  }

  findElement(nombre: string): T | undefined {
    return [...this.collection.values()].find(
      (element) => element.nombre === nombre
    );
  }
  length(): number {
    return this.collection.size;
  }
  forEach(callback: (element: T) => void): void {
    this.collection.forEach(callback);
  }
  getNombres(): string[] {
    return [...this.collection.values()].map((element) => element.nombre);
  }

  sort(funcion: (a: T, b: T) => number): T[] {
    return [...this.collection.values()].sort(funcion);
  }

  filter(funcion: (element: T) => boolean): T[] {
    return [...this.collection.values()].filter(funcion);
  }

  SymbolIterator(): IterableIterator<T> {
    return this.collection.values();
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.SymbolIterator();
  }
}
