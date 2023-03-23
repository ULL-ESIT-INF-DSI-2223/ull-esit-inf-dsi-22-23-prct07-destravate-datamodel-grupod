import "mocha";
import { expect } from "chai";
import { Reto } from "../../src/datatypes/retos";

describe("Clase Retos", () => {
  it("Debe existir la clase Reto", () => {
    expect(Reto).to.exist;
  });
  it("Se debe poder crear una instancia de Reto", () => {
    const reto = new Reto("Reto1", [1], "correr", 1, [1]);
    expect(reto).to.be.an.instanceOf(Reto);
  });
  it("Se debe poder obtener las rutas de un reto", () => {
    const reto = new Reto("Reto1", [1], "correr", 1, [1]);
    expect(reto.getRutas()).to.be.deep.eq([1]);
  });
  it("Se debe poder obtener los kilómetros totales de un reto", () => {
    const reto = new Reto("Reto1", [1], "correr", 1, [1]);
    expect(reto.getKmTotales()).to.be.deep.eq(1);
  });
  it("Se debe poder obtener a los usuarios realizando el reto", () => {
    const reto = new Reto("Reto1", [1], "correr", 1, [1]);
    expect(reto.getUsuariosRealizandoReto()).to.be.deep.eq([1]);
  });
  it("Se debe poder cambiar el tipo de un reto", () => {
    const reto = new Reto("Reto1", [1], "correr", 1, [1]);
    reto.setTipoReto("bicicleta");
    expect(reto.getTipoReto()).to.be.deep.eq("bicicleta");
  });
  it("Se debe poder cambiar los kilómetros totales de un reto", () => {
    const reto = new Reto("Reto1", [1], "correr", 1, [1]);
    reto.setKmTotales(2);
    expect(reto.getKmTotales()).to.be.deep.eq(2);
  });
  it("Se debe poder cambiar las rutas de un reto", () => {
    const reto = new Reto("Reto1", [1], "correr", 1, [1]);
    reto.setRuta([2]);
    expect(reto.getRutas()).to.be.deep.eq([2]);
  });
  it("Se debe poder añadir una ruta a un reto", () => {
    const reto = new Reto("Reto1", [1], "correr", 1, [1]);
    reto.añadirRuta(2);
    expect(reto.getRutas()).to.be.deep.eq([1, 2]);
  });
  it("Se debe poder eliminar una ruta de un reto", () => {
    const reto = new Reto("Reto1", [1, 2], "correr", 1, [1]);
    reto.eliminarRuta(2);
    expect(reto.getRutas()).to.be.deep.eq([1]);
  });
  it("Se debe poder cambiar los usuarios realizando el reto", () => {
    const reto = new Reto("Reto1", [1], "correr", 1, [1]);
    reto.setUsuariosRealizandoReto([2]);
    expect(reto.getUsuariosRealizandoReto()).to.be.deep.eq([2]);
  });
});
