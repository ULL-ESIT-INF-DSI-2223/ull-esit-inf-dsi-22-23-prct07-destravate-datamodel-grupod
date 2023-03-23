import "mocha";
import { expect } from "chai";
import { Grupo } from "../../src/datatypes/grupos";
import { Stats } from "../../src/datatypes/stats";

describe("Clase Grupos", () => {
  it("Debe existir la clase Grupo", () => {
    expect(Grupo).to.exist;
  });
  it("Se debe poder crear una instancia de Grupo", () => {
    const grupos = new Grupo("Grupo 1", [], new Stats(), [], [], [], -1);
    expect(grupos).to.be.an.instanceOf(Grupo);
  });
  it("Se debe poder obtener los miembros de un grupo", () => {
    const grupos = new Grupo("Grupo 1", [1, 2, 3], new Stats(), [], [], [], -1);
    expect(grupos.getMiembros()).to.be.deep.eq([1, 2, 3]);
  });
  it("Se debe poder obtener los kilómetros recooridos de un grupo", () => {
    const stats = new Stats();
    stats.updateStats(100, 100);
    const grupos = new Grupo("Grupo 1", [1, 2, 3], stats, [], [], [], -1);
    expect(grupos.getKmRecorridosAnio()).to.be.deep.eq(100);
    expect(grupos.getKmRecorridosMes()).to.be.deep.eq(100);
    expect(grupos.getKmRecorridosSemana()).to.be.deep.eq(100);
  });
  it("Se debe poder obtener el owner de un grupo", () => {
    const grupos = new Grupo("Grupo 1", [1, 2, 3], new Stats(), [], [], [], 1);
    expect(grupos.getOwner()).to.be.deep.eq(1);
  });
  it("Se debe poder cambiar el owner de un grupo", () => {
    const grupos = new Grupo("Grupo 1", [1, 2, 3], new Stats(), [], [], [], 1);
    grupos.setOwner(2);
    expect(grupos.getOwner()).to.be.deep.eq(2);
  });
  it("Se debe poder cambiar el nombre de un grupo", () => {
    const grupos = new Grupo("Grupo 1", [1, 2, 3], new Stats(), [], [], [], 1);
    grupos.cambiarNombre("Grupo 2");
    expect(grupos.nombre).to.be.deep.eq("Grupo 2");
  });
  it("Se debe poder añadir un miembro a un grupo", () => {
    const grupos = new Grupo("Grupo 1", [1, 2, 3], new Stats(), [], [], [], 1);
    grupos.addMiembro(4);
    expect(grupos.getMiembros()).to.be.deep.eq([1, 2, 3, 4]);
  });
  it("Se debe poder añadir una ruta favorita a un grupo", () => {
    const grupos = new Grupo("Grupo 1", [1, 2, 3], new Stats(), [], [], [], 1);
    grupos.addRutaFavorita(4);
    expect(grupos.getRutasFavoritas()).to.be.deep.eq([4]);
  });
});
