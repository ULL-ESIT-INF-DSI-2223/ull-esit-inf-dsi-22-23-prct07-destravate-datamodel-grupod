import { Stats } from "./stats";

class Grupo {
  private static groupcount = 0;
  private groupid: number;
  private groupname: string;
  private miembros: number[];
  private group_stats: Stats;
  private clasificacion: number[];
  private rutas_favoritas: number[];
  private historico_rutas: {
    fecha: Date;
    rutaid: number;
  }[];
  constructor(groupname: string) {
    this.groupid = Grupo.groupcount++;
    this.groupname = groupname;
    this.miembros = [];
    this.group_stats = new Stats();
    this.clasificacion = [];
    this.rutas_favoritas = [];
    this.historico_rutas = [];
  }
}
