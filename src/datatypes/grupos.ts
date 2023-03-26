import { Datatype } from "./datatype";
import { Stats } from "./stats";
import { Usuario } from "./usuarios";

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
    private clasificacion: Usuario[],
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
    return this.group_stats.km_anio;
  }

  /**
   * funcion que devuelve la clasificacion del grupo
   * @returns Devuelve la clasificación del grupo
   */
  getClassification(): Usuario[] {
    return this.clasificacion;
  }

  /**
   * funcion que actualiza las estadisticas del grupo
   * @param km km recorridos
   * @param desnivel desnivel recorrido
   */
  updateStats(
    km_semana: number,
    km_mes: number,
    km_anio: number,
    desnivel_semana: number,
    desnivel_mes: number,
    desnivel_anio: number
  ) {
    this.group_stats.km_semana += km_semana;
    this.group_stats.km_mes += km_mes;
    this.group_stats.km_anio += km_anio;
    this.group_stats.desnivel_semana += desnivel_semana;
    this.group_stats.desnivel_mes += desnivel_mes;
    this.group_stats.desnivel_anio += desnivel_anio;
  }
  /**
   * Obtener distancia recorrida por el grupo en el mes
   * @returns Kilómetros recorridos por el grupo en el mes
   */
  public getKmRecorridosMes(): number {
    return this.group_stats.km_mes;
  }
  /**
   * Obtener distancia recorrida por el grupo en la semana
   * @returns Kilómetros recorridos por el grupo en la semana
   */
  public getKmRecorridosSemana(): number {
    return this.group_stats.km_semana;
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
  addMiembro(miembro: Usuario) {
    this.miembros.push(miembro.id);
    this.clasificacion.push(miembro);
    if (this.clasificacion.length > 1) {
      this.clasificacion.sort((a, b) => {
        if (a.getStats().km_anio > b.getStats().km_anio) {
          return -1;
        } else if (a.getStats().km_anio < b.getStats().km_anio) {
          return 1;
        } else {
          return 0;
        }
      });
    }

    this.updateStats(
      miembro.getStats().km_semana,
      miembro.getStats().km_mes,
      miembro.getStats().km_anio,
      miembro.getStats().desnivel_semana,
      miembro.getStats().desnivel_mes,
      miembro.getStats().desnivel_anio
    );
  }

  /**
   * funcion que elimina un miembro del grupo
   * @param miembro miembro a eliminar
   */
  eliminarMiembro(miembro: Usuario) {
    this.miembros = this.miembros.filter((id) => id != miembro.id);
    this.clasificacion = this.clasificacion.filter(
      (usuario) => usuario.id != miembro.id
    );
    this.updateStats(
      -miembro.getStats().km_semana,
      -miembro.getStats().km_mes,
      -miembro.getStats().km_anio,
      -miembro.getStats().desnivel_semana,
      -miembro.getStats().desnivel_mes,
      -miembro.getStats().desnivel_anio
    );
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
