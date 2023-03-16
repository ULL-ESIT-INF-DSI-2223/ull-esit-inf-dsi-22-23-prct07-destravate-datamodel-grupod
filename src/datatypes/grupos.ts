import { Stats } from "./stats";
import { Datatype } from "./datatype";

export class Grupo implements Datatype {
  private static groupcount = 0;
  public id: number;
  public nombre: string;
  private miembros: number[];
  private group_stats: Stats;
  private clasificacion: number[];
  private rutas_favoritas: number[];
  private historico_rutas: {
    fecha: Date;
    rutaid: number;
  }[];
  constructor(groupname: string) {
    this.id = Grupo.groupcount++;
    this.nombre = groupname;
    this.miembros = [];
    this.group_stats = new Stats();
    this.clasificacion = [];
    this.rutas_favoritas = [];
    this.historico_rutas = [];
  }
}
