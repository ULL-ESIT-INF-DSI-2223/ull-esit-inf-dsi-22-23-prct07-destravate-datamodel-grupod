import "mocha";
import { expect } from "chai";
import { RutaCollection } from "../../src/collections/rutas_collection";
import { Ruta } from "../../src/datatypes/rutas";

describe("RutaCollection", () => {
  it("Debe existir la clase rutaCollection", () => {
    expect(RutaCollection).to.exist;
  });
  it("Se debe poder crear una instancia de rutaCollection", () => {
    const rutas = new RutaCollection();
    expect(rutas).to.be.an.instanceOf(RutaCollection);
  });
  it("Se debe poder añadir un ruta a la colección", () => {
    const rutas = new RutaCollection();
    const ruta = new Ruta("ruta1", [1, 1], [2, 2], 1, 1, [1], "ruta1", 1);
    rutas.addElement(ruta);
    expect(rutas.getElement(ruta.id)).to.be.equal(ruta);
  });
  it("Se debe poder eliminar un ruta de la colección", () => {
    const rutas = new RutaCollection();
    const ruta = new Ruta("ruta1", [1, 1], [2, 2], 1, 1, [1], "ruta1", 1);
    rutas.addElement(ruta);
    rutas.removeElement(ruta.id);
    expect(rutas.getElement(ruta.id)).to.be.undefined;
  });
  it("Se debe poder obtener un ruta de la colección", () => {
    const rutas = new RutaCollection();
    const ruta = new Ruta("ruta1", [1, 1], [2, 2], 1, 1, [1], "ruta1", 1);
    rutas.addElement(ruta);
    expect(rutas.getElement(ruta.id)).to.be.equal(ruta);
  });
});
