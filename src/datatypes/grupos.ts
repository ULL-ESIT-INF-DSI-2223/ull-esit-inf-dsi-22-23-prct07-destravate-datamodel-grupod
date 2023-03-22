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
    private historico_rutas: { fecha: Date; rutaid: number }[],
    private owner: number
  ) {
    this.id = Grupo.groupcount++;
  }

  public getMiembros(): number[] {
    return this.miembros;
  }

  public getKmRecorridosAnio(): number {
    return this.group_stats.getYearDistance();
  }

  public getKmRecorridosMes(): number {
    return this.group_stats.getMonthDistance();
  }

  public getKmRecorridosSemana(): number {
    return this.group_stats.getWeekDistance();
  }
  setOwner(owner: number) {
    this.owner = owner;
  }
}
