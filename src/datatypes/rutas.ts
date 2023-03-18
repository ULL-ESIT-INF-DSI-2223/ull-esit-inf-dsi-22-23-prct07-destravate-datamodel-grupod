import { Datatype } from "./datatype";

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
    private longitud: number,
    private desnivel: number,
    private usuarios_ya_realizados: number[],
    private tipo_ruta: string,
    private calificacion: number[]
  ) {
    this.id = Ruta.rutacount++;
    this.cordenadas_incio = cordenadas_incio;
    this.cordenadas_fin = cordenadas_fin;
    this.longitud = longitud;
    this.desnivel = desnivel;
    this.usuarios_ya_realizados = usuarios_ya_realizados;
    this.tipo_ruta = tipo_ruta;
    for (let i = 0; i < calificacion.length; i++) {
      this.calificacion.push(calificacion[i]);
    }
    this.calificacion_media =
      this.calificacion.reduce((a, b) => a + b, 0) / this.calificacion.length;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public getUsuarios(): number[] {
    return this.usuarios_ya_realizados;
  }

  public getDistancia(): number {
    return this.longitud;
  }

  public getTipoRuta(): string {
    return this.tipo_ruta;
  }
  
  public getCalificacionMedia(): number {
    return this.calificacion_media;
  }
}
