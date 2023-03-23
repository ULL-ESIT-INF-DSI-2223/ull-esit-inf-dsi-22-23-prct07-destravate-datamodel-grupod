import { Usuario } from "../datatypes/usuarios";
import { Grupo } from "../datatypes/grupos";
import { Reto } from "../datatypes/retos";
import { Ruta } from "../datatypes/rutas";
/**
 * Clase base para las colecciones de la aplicación
 */
export abstract class BaseCollection<T extends Usuario | Grupo | Reto | Ruta> {
  protected collection: Map<number, T>;
  constructor() {
    this.collection = new Map<number, T>();
  }
  /**
   * Añadir un elemento a la colección
   * @param element Elemento a añadir
   * @returns ID del elemento añadido
   */
  addElement(element: T): number {
    this.collection.set(element.id, element);
    return element.id;
  }
  /**
   * Eliminar un elemento de la colección
   * @param id ID del elemento a eliminar
   */
  removeElement(id: number): void {
    this.collection.delete(id);
  }
  /**
   * Actualizar un elemento de la colección
   * @param element Elemento a actualizar
   */
  updateElement(element: T): void {
    this.collection.set(element.id, element);
  }
  /**
   * Buscar un elemento en la colección por su ID
   * @param id ID del elemento a buscar
   * @returns Elemento buscado o undefined si no existe
   */
  getElement(id: number): T | undefined {
    return this.collection.get(id);
  }
  /**
   * Buscar un elemento en la colección por su nombre
   * @param nombre Nombre del elemento a buscar
   * @returns Elemento buscado o undefined si no existe
   */
  findElement(nombre: string): T | undefined {
    return [...this.collection.values()].find(
      (element) => element.nombre === nombre
    );
  }
  /**
   * Tamaño de la colección
   * @returns Número de elementos en la colección
   */
  length(): number {
    return this.collection.size;
  }
  /**
   * Iterar sobre la colección
   * @param callback Función a ejecutar por cada elemento de la colección
   */
  forEach(callback: (element: T) => void): void {
    this.collection.forEach(callback);
  }
  /**
   * Conseguir los nombres de los elementos de la colección
   * @returns Array con los nombres de los elementos de la colección
   */
  getNombres(): string[] {
    return [...this.collection.values()].map((element) => element.nombre);
  }
  /**
   * Ordenar la colección
   * @param funcion Función a ejecutar para ordenar la colección
   * @returns Colección ordenada
   */
  sort(funcion: (a: T, b: T) => number): T[] {
    return [...this.collection.values()].sort(funcion);
  }
  /**
   * Filtrar la colección
   * @param funcion Función a ejecutar por cada elemento de la colección
   * @returns Colección filtrada
   */
  filter(funcion: (element: T) => boolean): T[] {
    return [...this.collection.values()].filter(funcion);
  }
  /**
   * Iterador de la colección
   * @returns Iterador de la colección
   */
  SymbolIterator(): IterableIterator<T> {
    return this.collection.values();
  }
  /**
   * Iterador de la colección
   * @returns Iterador de la colección
   */
  [Symbol.iterator](): IterableIterator<T> {
    return this.SymbolIterator();
  }
}
