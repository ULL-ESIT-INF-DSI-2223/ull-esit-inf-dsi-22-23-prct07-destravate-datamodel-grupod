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
  getWeekDistance() {
    return this.week_distance;
  }
  getWeekSlope() {
    return this.week_slope;
  }
  getMonthDistance() {
    return this.month_distance;
  }
  getMonthSlope() {
    return this.month_slope;
  }
  getYearDistance() {
    return this.year_distance;
  }
  getYearSlope() {
    return this.year_slope;
  }
  updateStats(distance: number, slope: number) {
    this.week_distance += distance;
    this.week_slope += slope;
    this.month_distance += distance;
    this.month_slope += slope;
    this.year_distance += distance;
    this.year_slope += slope;
  }
  newWeek() {
    this.week_distance = 0;
    this.week_slope = 0;
  }
  newMonth() {
    this.month_distance = 0;
    this.month_slope = 0;
  }
  newYear() {
    this.year_distance = 0;
    this.year_slope = 0;
  }
}
