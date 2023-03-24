import "mocha";
import { expect } from "chai";
import { RetoCollection } from "../../src/collections/retos_collection";
import { Reto } from "../../src/datatypes/retos";

describe("RetoCollection", () => {
  it("Debe existir la clase retoCollection", () => {
    expect(RetoCollection).to.exist;
  });
  it("Se debe poder crear una instancia de retoCollection", () => {
    const retos = new RetoCollection();
    expect(retos).to.be.an.instanceOf(RetoCollection);
  });
  it("Se debe poder añadir un reto a la colección", () => {
    const retos = new RetoCollection();
    const reto = new Reto("Reto1", [1], "correr", 1, [1]);
    retos.addElement(reto);
    expect(retos.getElement(reto.id)).to.be.equal(reto);
  });
  it("Se debe poder eliminar un reto de la colección", () => {
    const retos = new RetoCollection();
    const reto = new Reto("Reto1", [1], "correr", 1, [1]);
    retos.addElement(reto);
    retos.removeElement(reto.id);
    expect(retos.getElement(reto.id)).to.be.undefined;
  });
  it("Se debe poder obtener un reto de la colección", () => {
    const retos = new RetoCollection();
    const reto = new Reto("Reto1", [1], "correr", 1, [1]);
    retos.addElement(reto);
    expect(retos.getElement(reto.id)).to.be.equal(reto);
  });
  it("Se debe poder actualizar un reto de la colección", () => {
    const retos = new RetoCollection();
    const reto = new Reto("Reto1", [1], "correr", 1, [1]);
    retos.addElement(reto);
    reto.nombre = "Reto2";
    retos.updateElement(reto);
    expect(retos.getElement(reto.id)).to.be.equal(reto);
  });
  it("Se debe poder buscar un reto de la colección", () => {
    const retos = new RetoCollection();
    const reto = new Reto("Reto1", [1], "correr", 1, [1]);
    retos.addElement(reto);
    expect(retos.findElement(reto.nombre)).to.be.equal(reto);
  });
  it("Se debe poder obtener el número de retos de la colección", () => {
    const retos = new RetoCollection();
    const reto = new Reto("Reto1", [1], "correr", 1, [1]);
    retos.addElement(reto);
    expect(retos.length()).to.be.equal(1);
  });
  it("Se debe poder obtener los nombres de los retos de la colección", () => {
    const retos = new RetoCollection();
    const reto = new Reto("Reto1", [1], "correr", 1, [1]);
    retos.addElement(reto);
    let nombres = retos.getAllElements().map((reto) => reto.nombre);
    expect(nombres).to.be.eql(["Reto1"]);
  });
});
