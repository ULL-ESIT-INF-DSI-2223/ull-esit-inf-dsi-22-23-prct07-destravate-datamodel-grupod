import { Datatype } from "./datatype";
/**
 * Tipo de dato Actividad
 * @typedef {string} Actividad
 */
type Actividad = "correr" | "bicicleta" | undefined;
/**
 * Tipo de dato Coordenadas
 */
export type Coordenadas = [number, number];
/**
 * Clase que define el tipo de dato Ruta
 */
export class Ruta implements Datatype {
  private static rutacount = 0;
  public id: number;
  public static ids_rutas: number[] = [];
  private calificacion_media: number;

  constructor(
    public nombre: string,
    private cordenadas_incio: Coordenadas,
    private cordenadas_fin: Coordenadas,
    private distancia: number,
    private desnivel: number,
    private usuarios_ya_realizados: number[],
    private tipo_ruta: Actividad,
    private calificacion: number[]
  ) {
    this.id = Ruta.rutacount++;
    this.cordenadas_incio = cordenadas_incio;
    this.cordenadas_fin = cordenadas_fin;
    this.distancia = distancia;
    this.desnivel = desnivel;
    this.usuarios_ya_realizados = usuarios_ya_realizados;
    this.tipo_ruta = tipo_ruta;
    this.calificacion = calificacion;
    this.calificacion_media =
      this.calificacion.reduce((a, b) => a + b, 0) / this.calificacion.length;
  }
  /**
   * Obtener los usuarios que ya han realizado la ruta
   * @returns Usuarios que ya han realizado la ruta
   */
  public getUsuarios(): number[] {
    return this.usuarios_ya_realizados;
  }
  /**
   * Obtener las coordenadas de inicio de la ruta
   * @returns Devuelve las coordenadas de inicio de la ruta
   */
  public getCoordenadasInicio(): Coordenadas {
    return this.cordenadas_incio;
  }
  /**
   * Obtener las coordenadas de fin de la ruta
   * @returns Devuelve las coordenadas de fin de la ruta
   */
  public getCoordenadasFin(): Coordenadas {
    return this.cordenadas_fin;
  }
  /**
   * Obtener la distancia de la ruta
   * @returns Devuelve la distancia de la ruta
   */
  public getDistancia(): number {
    return this.distancia;
  }
  /**
   * Obtener el desnivel de la ruta
   * @returns Devuelve el desnivel de la ruta
   */
  public getDesnivel(): number {
    return this.desnivel;
  }
  /**
   * Obtener el tipo de ruta
   * @returns Devuelve el tipo de ruta
   */
  public getTipoRuta(): Actividad {
    return this.tipo_ruta;
  }
  /**
   * Obtener la calificación media de la ruta
   * @returns Devuelve la calificación media de la ruta
   */
  public getCalificacionMedia(): number {
    return this.calificacion_media;
  }
  /**
   * Cambiar el nombre de la ruta
   * @param nombre Nuevo nombre de la ruta
   */
  public cambiarNombre(nombre: string): void {
    this.nombre = nombre;
  }
  /**
   *Cambiar la distancia de la ruta
   * @param distancia Nueva distancia de la ruta
   */
  public cambiarDistancia(distancia: number): void {
    this.distancia = distancia;
  }
  /**
   * Cambiar el desnivel de la ruta
   * @param desnivel Nuevo desnivel de la ruta
   */
  public cambiarDesnivel(desnivel: number): void {
    this.desnivel = desnivel;
  }
  /**
   * Cambiar el tipo de ruta
   * @param tipo_ruta Nuevo tipo de ruta
   */
  public cambiarTipoRuta(tipo_ruta: Actividad): void {
    this.tipo_ruta = tipo_ruta;
  }
}
