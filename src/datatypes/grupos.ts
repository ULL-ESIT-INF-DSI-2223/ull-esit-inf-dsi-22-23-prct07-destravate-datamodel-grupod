import { Stats } from "./stats";
import { Datatype } from "./datatype";
/**
 * Clase que define el tipo de dato Grupo
 */
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
  /**
   * Obtener los miembros del grupo
   * @returns Devuelve los miembros del grupo
   */
  public getMiembros(): number[] {
    return this.miembros;
  }
  /**
   * Obtener distancia recorrida por el grupo en el año
   * @returns Kilómetros recorridos por el grupo en el año
   */
  public getKmRecorridosAnio(): number {
    return this.group_stats.getYearDistance();
  }
  /**
   * Obtener distancia recorrida por el grupo en el mes
   * @returns Kilómetros recorridos por el grupo en el mes
   */
  public getKmRecorridosMes(): number {
    return this.group_stats.getMonthDistance();
  }
  /**
   * Obtener distancia recorrida por el grupo en la semana
   * @returns Kilómetros recorridos por el grupo en la semana
   */
  public getKmRecorridosSemana(): number {
    return this.group_stats.getWeekDistance();
  }
  /**
   * Obtener ID del propietario del grupo
   * @returns ID del propietario del grupo
   */
  public getOwner(): number {
    return this.owner;
  }
  /**
   * Cambiar el propietario del grupo
   * @param owner ID del nuevo propietario
   */
  setOwner(owner: number) {
    this.owner = owner;
  }
  /**
   * Cambiar el nombre del grupo
   * @param nombre Nuevo nombre del grupo
   */
  cambiarNombre(nombre: string) {
    this.nombre = nombre;
  }
  /**
   * Añadir un miembro al grupo
   * @param miembro ID del miembro a añadir
   */
  addMiembro(miembro: number) {
    this.miembros.push(miembro);
  }
  /**
   * Añadir una ruta favorita al grupo
   * @param ruta ID de la ruta a añadir
   */
  addRutaFavorita(ruta: number) {
    this.rutas_favoritas.push(ruta);
  }
  /**
   * Obtener las rutas favoritas del grupo
   * @returns IDs de las rutas favoritas del grupo
   */
  getRutasFavoritas(): number[] {
    return this.rutas_favoritas;
  }
}
