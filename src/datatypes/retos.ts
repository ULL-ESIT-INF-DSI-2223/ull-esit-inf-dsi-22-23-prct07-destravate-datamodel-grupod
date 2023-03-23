import { Datatype } from "./datatype";
/**
 * Tipo de dato Actividad
 */
type Actividad = "correr" | "bicicleta" | undefined;
/**
 * Clase que define el tipo de dato Reto
 */
export class Reto implements Datatype {
  private static retoCount = 0;
  public id: number;
  public static ids_retos: number[] = [];

  constructor(
    public nombre: string,
    private rutas: number[],
    private tipo_reto: Actividad,
    private km_totales: number,
    private usuarios_realizando_reto: number[]
  ) {
    this.id = Reto.retoCount++;
  }
  /**
   * Obtener las rutas del reto
   * @returns Devuelve las rutas del reto
   */
  public getRutas(): number[] {
    return this.rutas;
  }
  /**
   * Obtener los kilómetros totales del reto
   * @returns Devuelve los kilómetros totales del reto
   */
  public getKmTotales(): number {
    return this.km_totales;
  }
  /**
   * Obtener los usuarios que están realizando el reto
   * @returns Devuelve los usuarios que están realizando el reto
   */
  public getUsuariosRealizandoReto(): number[] {
    return this.usuarios_realizando_reto;
  }
  /**
   * Obtener el tipo de reto
   * @returns Devuelve el tipo de reto
   */
  public getTipoReto(): Actividad {
    return this.tipo_reto;
  }
  /**
   * Cambia el tipo de reto
   * @param tipo_reto Nuevo tipo de reto
   */
  public setTipoReto(tipo_reto: Actividad): void {
    this.tipo_reto = tipo_reto;
  }
  /**
   * Cambia los kilómetros totales del reto
   * @param km_totales Nuevos kilómetros totales
   */
  public setKmTotales(km_totales: number): void {
    this.km_totales = km_totales;
  }
  /**
   * Cambiar los usuarios que están realizando el reto
   * @param usuarios_realizando_reto Nuevos usuarios que están realizando el reto
   */
  public setUsuariosRealizandoReto(usuarios_realizando_reto: number[]): void {
    this.usuarios_realizando_reto = usuarios_realizando_reto;
  }
  /**
   * Cambia las rutas del reto
   * @param ruta Nuevas rutas del reto
   */
  public setRuta(ruta: number[]): void {
    this.rutas = ruta;
  }
  /**
   * Añade una ruta al reto
   * @param ruta Nueva ruta del reto
   */
  public añadirRuta(ruta: number): void {
    this.rutas.push(ruta);
  }
  /**
   * Elimina una ruta del reto
   * @param ruta Ruta a eliminar
   */
  public eliminarRuta(ruta: number): void {
    this.rutas = this.rutas.filter((element) => element !== ruta);
  }
}
