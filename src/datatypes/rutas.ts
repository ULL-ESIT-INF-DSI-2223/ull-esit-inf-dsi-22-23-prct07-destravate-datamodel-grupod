import { Datatype } from "./datatype";

type coordenadas = [number, number];

export class Ruta implements Datatype {
  private static rutacount = 0;
  public id: number;
  public nombre: string;
  private cordenadas_incio: coordenadas;
  private cordenadas_fin: coordenadas;
  private longitud: number;
  private desnivel: number;
  private usuarios_ya_realizados: number[];
  private tipo_ruta: string;
  private calificacion: number;

  public static ids_rutas: number[] = [];

  constructor(nombre: string) {
    this.id = Ruta.rutacount++;
    this.nombre = nombre;
    this.cordenadas_incio = [0, 0];
    this.cordenadas_fin = [0, 0];
    this.longitud = 0;
    this.desnivel = 0;
    this.usuarios_ya_realizados = [];
    this.tipo_ruta = "";
    this.calificacion = 0;
  }

  public getNombre(): string {
    return this.nombre;
  }
}
