import "mocha";
import { expect } from "chai";
import { JsonRutas } from "../../src/jsonadapters/jsonrutas";
import { Ruta } from "../../src/datatypes/rutas";
import fs from "fs";

describe("JsonRutas", () => {
  it("Debe existir la clase JsonRutas", () => {
    expect(JsonRutas).to.exist;
  });
  it("Se debe poder crear un objeto de la clase JsonRutas", () => {
    const jsonRutas = new JsonRutas();
    expect(jsonRutas).to.be.an.instanceOf(JsonRutas);
  });
  it("Se puede añadir una ruta a la base de datos", () => {
    const jsonRuta = new JsonRutas();
    const ruta = new Ruta("Ruta1 TEST", [1, 1], [2, 2], 1, 1, [1], "correr", [
      1,
    ]);
    expect(jsonRuta.addElement(ruta)).to.be.deep.eq(ruta.id);
  });
  it("Se puede modificar un ruta de la base de datos", () => {
    const jsonRuta = new JsonRutas();
    const rutas = jsonRuta.getAllElements();
    const size = rutas.length;
    const ruta = rutas[size - 1];
    ruta.nombre = "Ruta 2 TEST";
    jsonRuta.updateElement(ruta);
    expect(ruta.nombre).to.be.deep.eq("Ruta 2 TEST");
  });
  it("Se puede eliminar un ruta de la base de datos", () => {
    const jsonRuta = new JsonRutas();
    const rutas = jsonRuta.getAllElements();
    const size = rutas.length;
    const ruta_id = rutas[size - 1].id;
    expect(jsonRuta.removeElement(ruta_id)).to.be.deep.eq(true);
  });
});
