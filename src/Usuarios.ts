import { Stats } from "./Stats";

type Actividad = "correr" | "bicicleta" | undefined;

export class Usuario {
  private static usercount = 0;
  private userid: number;
  private username: string;
  private actividad: Actividad;
  private amigos: number[];
  private stats: Stats;
  private rutas_favoritas: number[];
  private retos_activos: number[];
  private historico_rutas: {
    fecha: Date;
    rutaid: number;
  }[];
  constructor(username: string) {
    this.userid = Usuario.usercount++;
    this.username = username;
    this.actividad = undefined;
    this.amigos = [];
    this.stats = new Stats();
    this.rutas_favoritas = [];
    this.retos_activos = [];
    this.historico_rutas = [];
  }
}
