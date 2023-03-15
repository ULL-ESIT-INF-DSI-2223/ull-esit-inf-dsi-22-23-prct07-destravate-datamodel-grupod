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
    const reto = new Reto("Reto1", [1], "ruta1", 1, [1]);
    retos.addElement(reto);
    expect(retos.getElement(reto.id)).to.be.equal(reto);
  });
  it("Se debe poder eliminar un reto de la colección", () => {
    const retos = new RetoCollection();
    const reto = new Reto("Reto1", [1], "ruta1", 1, [1]);
    retos.addElement(reto);
    retos.removeElement(reto.id);
    expect(retos.getElement(reto.id)).to.be.undefined;
  });
  it("Se debe poder obtener un reto de la colección", () => {
    const retos = new RetoCollection();
    const reto = new Reto("Reto1", [1], "ruta1", 1, [1]);
    retos.addElement(reto);
    expect(retos.getElement(reto.id)).to.be.equal(reto);
  });
});
