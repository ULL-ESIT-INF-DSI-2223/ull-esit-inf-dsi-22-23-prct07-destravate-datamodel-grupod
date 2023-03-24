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
   * @returns true si se ha eliminado el elemento, false en caso contrario
   */
  removeElement(id: number): boolean {
    return this.collection.delete(id);
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
   * función que devuelve todos los elementos de la colección
   * @returns Devuelve todos los elementos de la colección
   */
  getAllElements(): T[] {
    return [...this.collection.values()];
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
}
