type coordenadas = [number, number];

export class Ruta {
  private static rutacount = 0;
  private id: number;
  private nombre: string;
  private cordenadas_incio: coordenadas;
  private cordenadas_fin: coordenadas;
  private longitud: number;
  private desnivel: number;
  private usuarios_ya_realizados: number[];
  private tipo_ruta: string;
  private calificacion: number;

  public static ids_rutas: number[] = [];

  constructor(
    nombre: string,
    cordenadas_incio: coordenadas,
    cordenadas_fin: coordenadas,
    longitud: number,
    desnivel: number,
    usuarios_ya_realizados: number[],
    tipo_ruta: string,
    calificacion: number
  ) {
    this.id = Ruta.rutacount++;
    this.nombre = nombre;
    this.cordenadas_incio = cordenadas_incio;
    this.cordenadas_fin = cordenadas_fin;
    this.longitud = longitud;
    this.desnivel = desnivel;
    this.usuarios_ya_realizados = usuarios_ya_realizados;
    this.tipo_ruta = tipo_ruta;
    this.calificacion = calificacion;
  }
}
