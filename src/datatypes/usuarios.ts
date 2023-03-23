import { Stats } from "./stats";
import { Datatype } from "./datatype";
import { Ruta } from "./rutas";

type Actividad = "correr" | "bicicleta" | undefined;

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
  public getKmRecorridosSemana(): number {
    return this.stats.getWeekDistance();
  }

  public getKmRecorridosMes(): number {
    return this.stats.getMonthDistance();
  }

  public getKmRecorridosAnio(): number {
    return this.stats.getYearDistance();
  }
  cambiarNombre(nombre: string) {
    this.nombre = nombre;
  }
  cambiarActividad(actividad: Actividad) {
    this.actividad = actividad;
  }
  addAmigo(amigo: number) {
    this.amigos.push(amigo);
  }
  addRutaFavorita(ruta: number) {
    this.rutas_favoritas.push(ruta);
  }
  addRetoActivo(reto: number) {
    this.retos_activos.push(reto);
  }
  addHistoricoRuta(ruta: Ruta) {
    const entrada = {
      fecha: new Date(),
      rutaid: ruta.id,
    };
    this.historico_rutas.push(entrada);
    this.stats.updateStats(ruta.getDistancia(), ruta.getDesnivel());
  }
}
