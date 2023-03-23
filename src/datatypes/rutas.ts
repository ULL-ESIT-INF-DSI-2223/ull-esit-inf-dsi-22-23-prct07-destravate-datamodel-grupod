import { Datatype } from "./datatype";

type Actividad = "correr" | "bicicleta" | undefined;
export type Coordenadas = [number, number];

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

  public getUsuarios(): number[] {
    return this.usuarios_ya_realizados;
  }

  public getDistancia(): number {
    return this.distancia;
  }
  public getDesnivel(): number {
    return this.desnivel;
  }
  public getTipoRuta(): Actividad {
    return this.tipo_ruta;
  }

  public getCalificacionMedia(): number {
    return this.calificacion_media;
  }
  public cambiarNombre(nombre: string): void {
    this.nombre = nombre;
  }
  public cambiarDistancia(distancia: number): void {
    this.distancia = distancia;
  }
  public cambiarDesnivel(desnivel: number): void {
    this.desnivel = desnivel;
  }
  public cambiarTipoRuta(tipo_ruta: Actividad): void {
    this.tipo_ruta = tipo_ruta;
  }
}
