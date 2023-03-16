import "mocha";
import { expect } from "chai";
import { Stats } from "../../src/datatypes/stats";

describe("Clase Stats", () => {
  it("Debe existir la clase Stats", () => {
    expect(Stats).to.exist;
  });
  it("Se debe poder crear una instancia de Stats", () => {
    const stats = new Stats();
    expect(stats).to.be.an.instanceOf(Stats);
  });
  it("Se debe poder actualizar y acceder a las estadísticas del usuario", () => {
    const stats = new Stats();
    stats.updateStats(100, 100);
    expect(stats.getWeekDistance()).to.be.equal(100);
    expect(stats.getWeekSlope()).to.be.equal(100);
    expect(stats.getMonthDistance()).to.be.equal(100);
    expect(stats.getMonthSlope()).to.be.equal(100);
    expect(stats.getYearDistance()).to.be.equal(100);
    expect(stats.getYearSlope()).to.be.equal(100);
  });
  it("Se debe poder reinicializar las estadísticas del usuario cada semana", () => {
    const stats = new Stats();
    stats.updateStats(100, 100);
    stats.newWeek();
    expect(stats.getWeekDistance()).to.be.equal(0);
    expect(stats.getWeekSlope()).to.be.equal(0);
    expect(stats.getMonthDistance()).to.be.equal(100);
    expect(stats.getMonthSlope()).to.be.equal(100);
    expect(stats.getYearDistance()).to.be.equal(100);
    expect(stats.getYearSlope()).to.be.equal(100);
  });
  it("Se debe poder reinicializar las estadísticas del usuario cada mes", () => {
    const stats = new Stats();
    stats.updateStats(100, 100);
    stats.newMonth();
    expect(stats.getWeekDistance()).to.be.equal(100);
    expect(stats.getWeekSlope()).to.be.equal(100);
    expect(stats.getMonthDistance()).to.be.equal(0);
    expect(stats.getMonthSlope()).to.be.equal(0);
    expect(stats.getYearDistance()).to.be.equal(100);
    expect(stats.getYearSlope()).to.be.equal(100);
  });
  it("Se debe poder reinicializar las estadísticas del usuario cada año", () => {
    const stats = new Stats();
    stats.updateStats(100, 100);
    stats.newYear();
    expect(stats.getWeekDistance()).to.be.equal(100);
    expect(stats.getWeekSlope()).to.be.equal(100);
    expect(stats.getMonthDistance()).to.be.equal(100);
    expect(stats.getMonthSlope()).to.be.equal(100);
    expect(stats.getYearDistance()).to.be.equal(0);
    expect(stats.getYearSlope()).to.be.equal(0);
  });
});
