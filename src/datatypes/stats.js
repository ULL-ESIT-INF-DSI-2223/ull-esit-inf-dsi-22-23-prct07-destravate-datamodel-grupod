"use strict";
exports.__esModule = true;
exports.Stats = void 0;
var Stats = /** @class */ (function () {
    function Stats() {
        this.week_distance = 0;
        this.week_slope = 0;
        this.month_distance = 0;
        this.month_slope = 0;
        this.year_distance = 0;
        this.year_slope = 0;
    }
    Stats.prototype.getWeekDistance = function () {
        return this.week_distance;
    };
    Stats.prototype.getWeekSlope = function () {
        return this.week_slope;
    };
    Stats.prototype.getMonthDistance = function () {
        return this.month_distance;
    };
    Stats.prototype.getMonthSlope = function () {
        return this.month_slope;
    };
    Stats.prototype.getYearDistance = function () {
        return this.year_distance;
    };
    Stats.prototype.getYearSlope = function () {
        return this.year_slope;
    };
    Stats.prototype.updateStats = function (distance, slope) {
        this.week_distance += distance;
        this.week_slope += slope;
        this.month_distance += distance;
        this.month_slope += slope;
        this.year_distance += distance;
        this.year_slope += slope;
    };
    Stats.prototype.newWeek = function () {
        this.week_distance = 0;
        this.week_slope = 0;
    };
    Stats.prototype.newMonth = function () {
        this.month_distance = 0;
        this.month_slope = 0;
    };
    Stats.prototype.newYear = function () {
        this.year_distance = 0;
        this.year_slope = 0;
    };
    return Stats;
}());
exports.Stats = Stats;
