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
    nombre: string
  ) {
    this.id = Reto.retoCount++;
    this.nombre = nombre;
    this._ruta = [];
    this._tipo_reto = "";
    this._km_totales = 0;
    this._usuarios_realizando_reto = [];
  }

  
}
