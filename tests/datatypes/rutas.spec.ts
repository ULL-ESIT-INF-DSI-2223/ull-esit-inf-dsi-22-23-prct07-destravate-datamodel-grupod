import "mocha";
import { expect } from "chai";
import { Ruta } from "../../src/datatypes/rutas";

describe("Clase Rutas", () => {
  it("Debe existir la clase Rutas", () => {
    expect(Ruta).to.exist;
  });
  it("Se debe poder crear una instancia de Rutas", () => {
    const ruta = new Ruta("ruta1", [1, 1], [2, 2], 1, 1, [1], "correr", [1]);
    expect(ruta).to.be.an.instanceOf(Ruta);
  });
  it("Se debe poder obtener los usuarios que ya han realizado la ruta", () => {
    const ruta = new Ruta("ruta1", [1, 1], [2, 2], 1, 1, [1], "correr", [1]);
    expect(ruta.getUsuarios()).to.be.deep.eq([1]);
  });
  it("Se debe poder obtener la distancia de la ruta", () => {
    const ruta = new Ruta("ruta1", [1, 1], [2, 2], 1, 1, [1], "correr", [1]);
    expect(ruta.getDistancia()).to.be.deep.eq(1);
  });
  it("Se debe poder obtener el desnivel de la ruta", () => {
    const ruta = new Ruta("ruta1", [1, 1], [2, 2], 1, 1, [1], "correr", [1]);
    expect(ruta.getDesnivel()).to.be.deep.eq(1);
  });
  it("Se debe poder obtener el tipo de la ruta", () => {
    const ruta = new Ruta("ruta1", [1, 1], [2, 2], 1, 1, [1], "correr", [1]);
    expect(ruta.getTipoRuta()).to.be.deep.eq("correr");
  });
  it("Se debe poder obtener la calificación media de la ruta", () => {
    const ruta = new Ruta("ruta1", [1, 1], [2, 2], 1, 1, [1], "correr", [1]);
    expect(ruta.getCalificacionMedia()).to.be.deep.eq(1);
  });
  it("Se debe poder cambiar el nombre de la ruta", () => {
    const ruta = new Ruta("ruta1", [1, 1], [2, 2], 1, 1, [1], "correr", [1]);
    ruta.cambiarNombre("ruta2");
    expect(ruta.nombre).to.be.deep.eq("ruta2");
  });
  it("Se debe poder cambiar la distancia de la ruta", () => {
    const ruta = new Ruta("ruta1", [1, 1], [2, 2], 1, 1, [1], "correr", [1]);
    ruta.cambiarDistancia(2);
    expect(ruta.getDistancia()).to.be.deep.eq(2);
  });
  it("Se debe poder cambiar el desnivel de la ruta", () => {
    const ruta = new Ruta("ruta1", [1, 1], [2, 2], 1, 1, [1], "correr", [1]);
    ruta.cambiarDesnivel(2);
    expect(ruta.getDesnivel()).to.be.deep.eq(2);
  });
  it("Se debe poder cambiar el tipo de la ruta", () => {
    const ruta = new Ruta("ruta1", [1, 1], [2, 2], 1, 1, [1], "correr", [1]);
    ruta.cambiarTipoRuta("bicicleta");
    expect(ruta.getTipoRuta()).to.be.deep.eq("bicicleta");
  });
  it("Se debe poder obtener las coordenadas de inicio de la ruta", () => {
    const ruta = new Ruta("ruta1", [1, 1], [2, 2], 1, 1, [1], "correr", [1]);
    expect(ruta.getCoordenadasInicio()).to.be.deep.eq([1, 1]);
  });
  it("Se debe poder obtener las coordenadas de fin de la ruta", () => {
    const ruta = new Ruta("ruta1", [1, 1], [2, 2], 1, 1, [1], "correr", [1]);
    expect(ruta.getCoordenadasFin()).to.be.deep.eq([2, 2]);
  });
  it("Se debe poder añadir un usuario a la lista de usuarios que han realizado la ruta", () => {
    const ruta = new Ruta("ruta1", [1, 1], [2, 2], 1, 1, [1], "correr", [1]);
    ruta.addUsuario(2);
    expect(ruta.getUsuarios()).to.be.deep.eq([1, 2]);
  });
});
