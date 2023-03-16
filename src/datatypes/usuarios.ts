import { Stats } from "./stats";
import { Datatype } from "./datatype";

type Actividad = "correr" | "bicicleta" | undefined;

export class Usuario implements Datatype {
  private static usercount = 0;
  public id: number;
  public nombre: string;
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
    this.id = Usuario.usercount++;
    this.nombre = username;
    this.actividad = undefined;
    this.amigos = [];
    this.stats = new Stats();
    this.rutas_favoritas = [];
    this.retos_activos = [];
    this.historico_rutas = [];
  }
}
