/**
 * Clase que define el tipo de dato Stats
 */
export class Stats {
  week_distance: number;
  week_slope: number;
  month_distance: number;
  month_slope: number;
  year_distance: number;
  year_slope: number;
  constructor() {
    this.week_distance = 0;
    this.week_slope = 0;
    this.month_distance = 0;
    this.month_slope = 0;
    this.year_distance = 0;
    this.year_slope = 0;
  }
  /**
   * Obtener la distancia recorrida en la semana
   * @returns Devuelve la distancia recorrida en la semana
   */
  getWeekDistance() {
    return this.week_distance;
  }
  /**
   * Obtener la pendiente recorrida en la semana
   * @returns Devuelve la pendiente recorrida en la semana
   */
  getWeekSlope() {
    return this.week_slope;
  }
  /**
   * Obtener la distancia recorrida en el mes
   * @returns Devuelve la distancia recorrida en el mes
   */
  getMonthDistance() {
    return this.month_distance;
  }
  /**
   * Obtener la pendiente recorrida en el mes
   * @returns Devuelve la pendiente recorrida en el mes
   */
  getMonthSlope() {
    return this.month_slope;
  }
  /**
   * Obtener la distancia recorrida en el año
   * @returns Devuelve la distancia recorrida en el año
   */
  getYearDistance() {
    return this.year_distance;
  }
  /**
   * Obtener la pendiente recorrida en el año
   * @returns Devuelve la pendiente recorrida en el año
   */
  getYearSlope() {
    return this.year_slope;
  }
  /**
   * Actualizar las estadísticas
   * @param distance Distancia recorrida
   * @param slope Pendiente recorrida
   */
  public updateStats(distance: number, slope: number) {
    this.week_distance += distance;
    this.week_slope += slope;
    this.month_distance += distance;
    this.month_slope += slope;
    this.year_distance += distance;
    this.year_slope += slope;
  }
  /**
   * Reiniciar las estadísticas de la semana
   */
  newWeek() {
    this.week_distance = 0;
    this.week_slope = 0;
  }
  /**
   * Reiniciar las estadísticas del mes
   */
  newMonth() {
    this.month_distance = 0;
    this.month_slope = 0;
  }
  /**
   * Reiniciar las estadísticas del año
   */
  newYear() {
    this.year_distance = 0;
    this.year_slope = 0;
  }
}
