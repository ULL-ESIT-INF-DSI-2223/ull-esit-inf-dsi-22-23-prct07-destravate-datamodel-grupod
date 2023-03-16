import { Datatype } from "./datatype";

export class Reto implements Datatype {
  private static retoCount = 0;
  public id: number;
  public nombre: string;
  private _ruta: number[];
  private _tipo_reto: string;
  private _km_totales: number;
  private _usuarios_realizando_reto: number[];

  public static ids_retos: number[] = [];

  constructor(
    nombre: string,
    ruta: number[],
    tipo_reto: string,
    km_totales: number,
    usuarios_realizando_reto: number[]
  ) {
    this.id = Reto.retoCount++;
    this.nombre = nombre;
    this._ruta = ruta;
    this._tipo_reto = tipo_reto;
    this._km_totales = km_totales;
    this._usuarios_realizando_reto = usuarios_realizando_reto;
  }

  
}
