import { Datatype } from "./datatype";

export type Coordenadas = [number, number];

export class Ruta implements Datatype {
  private static rutacount = 0;
  public id: number;
  public static ids_rutas: number[] = [];

  constructor(
    public nombre: string,
    private cordenadas_incio: Coordenadas,
    private cordenadas_fin: Coordenadas,
    private longitud: number,
    private desnivel: number,
    private usuarios_ya_realizados: number[],
    private tipo_ruta: string,
    private calificacion: number
  ) {
    this.id = Ruta.rutacount++;
  }
}
