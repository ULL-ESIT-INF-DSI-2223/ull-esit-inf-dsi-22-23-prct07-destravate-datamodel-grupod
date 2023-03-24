import { Datatype } from "./datatype";
import { Ruta } from "./rutas";
import { Stats } from "./stats";
/**
 * Tipo de dato Actividad
 */
type Actividad = "correr" | "bicicleta" | undefined;
/**
 * Clase que define el tipo de dato Usuario
 */
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
  /**
   * Obtener el tipo de actividad del usuario
   * @returns Devuelve el tipo de actividad del usuario
   */
  public getActividad(): Actividad {
    return this.actividad;
  }
  /**
   * Obtener los amigos del usuario
   * @returns Devuelve los amigos del usuario
   */
  public getAmigos(): number[] {
    return this.amigos;
  }
  /**
   * Obtener las estadísticas del usuario
   * @returns Devuelve las estadísticas del usuario
   */
  public getStats(): {
    km_semana: number;
    km_mes: number;
    km_anio: number;
    desnivel_semana: number;
    desnivel_mes: number;
    desnivel_anio: number;
  } {
    return this.stats;
  }
  /**
   * Obtener las rutas favoritas del usuario
   * @returns Devuelve las rutas favoritas del usuario
   */
  public getRutasFavoritas(): number[] {
    return this.rutas_favoritas;
  }
  /**
   * Obtener los retos activos del usuario
   * @returns Devuelve los retos activos del usuario
   */
  public getRetosActivos(): number[] {
    return this.retos_activos;
  }
  /**
   * Obtener el historico de rutas del usuario
   * @returns Devuelve el historico de rutas del usuario
   */
  public getHistoricoRutas(): {
    fecha: Date;
    rutaid: number;
  }[] {
    return this.historico_rutas;
  }
  /**
   * Obtener los kilómetros recorridos en la semana
   * @returns Devuelve los kilómetros recorridos en la semana
   */
  public getKmRecorridosSemana(): number {
    return this.stats.km_semana;
  }
  /**
   * Obtener los kilómetros recorridos en el mes
   * @returns Devuelve los kilómetros recorridos en el mes
   */
  public getKmRecorridosMes(): number {
    return this.stats.km_mes;
  }
  /**
   * Obtener los kilómetros recorridos en el año
   * @returns Devuelve los kilómetros recorridos en el año
   */
  public getKmRecorridosAnio(): number {
    return this.stats.km_anio;
  }

  /**
   * funcion para actualizar las estadisticas del usuario
   * @param km km recorridos
   * @param desnivel desnivel recorrido
   */
  updateStats(km: number, desnivel: number) {
    this.stats.km_semana += km;
    this.stats.km_mes += km;
    this.stats.km_anio += km;
    this.stats.desnivel_semana += desnivel;
    this.stats.desnivel_mes += desnivel;
    this.stats.desnivel_anio += desnivel;
  }

  /**
   * Cambiar el nombre del usuario
   * @param nombre Nuevo nombre del usuario
   */
  cambiarNombre(nombre: string) {
    this.nombre = nombre;
  }
  /**
   * Cambiar la actividad del usuario
   * @param actividad Nueva actividad del usuario
   */
  cambiarActividad(actividad: Actividad) {
    this.actividad = actividad;
  }
  /**
   * Añadir amigo al usuario
   * @param amigo ID del amigo a añadir
   */
  addAmigo(amigo: number) {
    this.amigos.push(amigo);
  }
  /**
   * Eliminar amigo del usuario
   * @param amigo ID del amigo a eliminar
   */
  removeAmigo(amigo: number) {
    this.amigos = this.amigos.filter((a) => a !== amigo);
  }
  /**
   * Añadir ruta a favoritos
   * @param ruta ID de la ruta a añadir a favoritos
   */
  addRutaFavorita(ruta: number) {
    this.rutas_favoritas.push(ruta);
  }
  /**
   * Añadir reto activo
   * @param reto ID del reto a añadir
   */
  addRetoActivo(reto: number) {
    this.retos_activos.push(reto);
  }
  /**
   * Añadir ruta al historico
   * @param ruta Ruta a añadir al historico
   */
  addHistoricoRuta(ruta: Ruta) {
    const entrada = {
      fecha: new Date(),
      rutaid: ruta.id,
    };
    this.historico_rutas.push(entrada);
    this.updateStats(ruta.getDistancia(), ruta.getDesnivel());
  }
}
