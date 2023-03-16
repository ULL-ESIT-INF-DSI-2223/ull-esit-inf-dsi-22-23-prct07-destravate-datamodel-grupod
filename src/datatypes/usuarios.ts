import { Stats } from "./stats";
import { Datatype } from "./datatype";

export type Actividad = "correr" | "bicicleta" | undefined;

export class Usuario implements Datatype {
  private static usercount = 0;
  public id: number;

  constructor(
    public nombre: string,
    private actividad: Actividad,
    private amigos: number[],
    private stats: Stats,
    private rutas_favoritas: number[],
    private retos_activos: number[],
    private historico_rutas: { fecha: Date; rutaid: number }[]
  ) {
    this.id = Usuario.usercount++;
  }
  public getActividad(): Actividad {
    return this.actividad;
  }
  public getAmigos(): number[] {
    return this.amigos;
  }
  public getStats(): Stats {
    return this.stats;
  }
  public getRutasFavoritas(): number[] {
    return this.rutas_favoritas;
  }
  public getRetosActivos(): number[] {
    return this.retos_activos;
  }
  public getHistoricoRutas(): {
    fecha: Date;
    rutaid: number;
  }[] {
    return this.historico_rutas;
  }
}
