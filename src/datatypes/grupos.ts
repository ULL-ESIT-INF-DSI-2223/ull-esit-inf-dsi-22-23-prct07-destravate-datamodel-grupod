import { Stats } from "./stats";
import { Datatype } from "./datatype";

export class Grupo implements Datatype {
  private static groupcount = 0;
  public id: number;

  constructor(
    public nombre: string,
    private miembros: number[],
    private group_stats: Stats,
    private clasificacion: number[],
    private rutas_favoritas: number[],
    private historico_rutas: { fecha: Date; rutaid: number }[]
  ) {
    this.id = Grupo.groupcount++;
  }
}
